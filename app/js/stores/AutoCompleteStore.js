'use strict';

import _ from 'lodash';
import Fuse from 'fuse.js';

import AppDispatcher from '../dispatchers/AppDispatcher';
import AutoCompleteConstants from '../constants/AutoCompleteConstants';
import AppConstants from '../constants/AppConstants';
import TerminalActions from '../actions/TerminalActions';
import AutoCompleteActions from '../actions/AutoCompleteActions';

import CommandStore from './CommandStore';
import ShellStore from './ShellStore';

import ChangeEmitter from '../mixins/ChangeEmitter';

const searchOptions = {
  caseSensitive: false,
  includeScore: false,
  shouldSort: true,
  threshold: 0.2,
  keys: ['name']
};

// HACK: This entire store is a hack to keep track of the text that the user has entered, since there was no property
// for that in the APIs term.js and pty.js expose to us. After further reflection, I think we can find the entered text by figuring out what
// the user's shell prompt is, getting the text in the current row in the terminal(you can find examples of this in the
// term.js codebase) and removing the prompt from that text.
class AutoCompleteStore extends ChangeEmitter {
  constructor() {
    // the text that the user has entered after the command prompt
    this.command = '';

    // the index of the user's cursor. Could probably be retrieved from term.js or pty.js instead.
    this.cursor = 0;

    // keys that we don't want to write into the buffer of text entered by the user.
    this.blacklist = [AppConstants.Keys.UpArrow, AppConstants.Keys.DownArrow, AppConstants.Keys.Enter];

    // all the suggestions for autocompletion based on the currently entered text
    this.suggestions = [];

    // the index of the autocompletion suggestion the user currently has selected
    // Should be -1 if there is no selection
    this.selectedIndex = -1;

    // any text that was filled in from choosing an autocomplete choice. This text needs
    // to be written to the shell.
    this.autoCompletedText = '';

    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {
        case AppConstants.AppActions.SEND_RAW_COMMANDS:
          AppDispatcher.waitFor([CommandStore.getDispatchToken()]);
          this.init(CommandStore.getAll());
          this.emitChange();
          break;

        case AppConstants.ShellActions.TYPE_KEY:
          // Otherwise, update command & suggestions
          this.updateCommand(payload.key);
          this.updateSuggestions();
          this.emitChange();
          break;

        case AutoCompleteConstants.Actions.SELECT_PREV:
          this.selectPrev();
          this.emitChange();
          break;

        case AutoCompleteConstants.Actions.SELECT_NEXT:
          this.selectNext();
          this.emitChange();
          break;

        case AutoCompleteConstants.Actions.CONFIRM_SUGGESTION:
          this.confirmSuggestion(payload.index);
          this.emitChange();
          break;

        case AutoCompleteConstants.Actions.CLOSE_SUGGESTIONS:
          this.selectedIndex = -1;
          this.emitChange();
          break;
      }
    });
  }

  init(commands) {
    this.fuzzySearch = new Fuse(commands, searchOptions);
  }

  getDispatchToken() {
    return this.dispatchToken;
  }

  getOverriddenKeys() {
    return this.blacklist;
  }

  getEnteredCommand() {
    return this.command;
  }

  getSuggestions() {
    return this.suggestions;
  }

  getSelectedIndex() {
    return this.selectedIndex;
  }

  clearSuggestions() {
    this.suggestions = [];
    this.selectedIndex = -1;
  }

  getSuggestion(index) {
    if (index === -1) {
      return null;
    }
    return this.suggestions[index].name;
  }

  confirmSuggestion(index) {
    if (index !== -1) {
      // Choose the suggestion by deleting the current command then filling in the chosen command
      let suggestion = this.getSuggestion(index);
      let sequence = _.times(this.command.length, () => AppConstants.Keys.Backspace).concat(suggestion.split(''));
      sequence.forEach(char => ShellStore.write(char));

      // Update command
      this.command = suggestion;

      // Move cursor to end of command
      this.cursor = this.command.length - 1;

      // Then clear new suggestions until more data is received
      this.clearSuggestions();
    }
  }

  updateCommand(key) {
    switch (key) {
      case AppConstants.Keys.Enter:
        this.command = '';
        this.cursor = 0;
        break;

      case AppConstants.Keys.LeftArrow:
        this.cursor = Math.max(-1, this.cursor - 1);
        break;

      case AppConstants.Keys.RightArrow:
        this.cursor = Math.min(this.command.length - 1, this.cursor + 1);
        break;

      case AppConstants.Keys.Backspace:
        if (this.cursor >= 0) {
          // Remove character at cursor
          this.command = this.command.slice(0, this.cursor) + this.command.slice(this.cursor + 1);
          this.cursor = Math.max(-1, this.cursor - 1);
        }
        break;

      default:
        if (this.blacklist.indexOf(key) === -1) {
          this.command += key;
          this.cursor++;
        }
        break;
    }
  }

  updateSuggestions() {
    if (this.fuzzySearch === undefined) {
      return;
    }

    // do a fuzzy search for the text the user has entered
    this.suggestions = this.fuzzySearch.search(this.command).map((candidate, i) => {
      // give each candidate a unique key
      candidate.key = i;
      return candidate;
    });
  }

  selectPrev() {
    if (this.suggestions.length === 0) {
      // No suggestions available
      this.selectedIndex = -1;
      return;
    }

    this.selectedIndex = Math.max(0, this.selectedIndex - 1);
  }

  selectNext() {
    if (this.suggestions.length === 0) {
      // No suggestions available
      this.selectedIndex = -1;
      return;
    }

    this.selectedIndex = Math.min(this.suggestions.length - 1, this.selectedIndex + 1);
  }

}

export default new AutoCompleteStore();
