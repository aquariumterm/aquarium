'use strict';

import Fuse from 'fuse.js';

import AppDispatcher from '../dispatchers/AppDispatcher';
import AutoCompleteConstants from '../constants/AutoCompleteConstants';
import AppConstants from '../constants/AppConstants';

import CommandStore from './CommandStore';

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
    this.text = '';

    // the index of the user's cursor. Could probably be retrieved from term.js or pty.js instead.
    this.cursor = 0;

    // keys that we don't want to write into the buffer of text entered by the user.
    this.blacklist = [TerminalConstants.Keys.UpArrow, TerminalConstants.Keys.DownArrow];

    // all the suggestions for autocompletion based on the currently entered text
    this.suggestions = [];

    // the index of the autocompletion suggestion the user currently has selected
    // Should be -1 if there is no selection
    this.selectionIndex = -1;

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

        case TerminalConstants.ShellActions.TYPE_KEY:
          this.updateText(payload.key);
          this.updateSuggestions(this.command);
          this.updateSelection(payload.key);
          this.emitChange();
          break;

        case AutoCompleteConstants.Actions.SELECT_SUGGESTION:
          this.selectSuggestion();
          this.emitChange();
          break;
      }
    });
  }

  init(commands) {
    this.fuzzySearch = new Fuse(commands, searchOptions);
  }

  getEnteredCommand() {
    return this.command;
  selectSuggestion() {
  }

    if (this.selectionIndex !== -1) {
      this.autoCompletedText = this.suggestions[this.selectionIndex].name;
      this.selectionIndex = -1;
    }
  }

  getSuggestions() {
    return this.suggestions;
  }

  updateText(key) {
    switch (key) {
      case TerminalConstants.Keys.Enter:
        this.command = '';
        this.cursor = 0;
        break;

      case TerminalConstants.Keys.LeftArrow:
        this.cursor = Math.max(-1, this.cursor - 1);
        break;

      case TerminalConstants.Keys.RightArrow:
        this.cursor = Math.min(this.command.length - 1, this.cursor + 1);
        break;

      case TerminalConstants.Keys.Backspace:
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

  updateSuggestions(enteredText) {
    if (this.fuzzySearch === undefined) {
      return;
    }

    // do a fuzzy search for the text the user has entered
    this.suggestions = this.fuzzySearch.search(enteredText);

    // give each candidate a unique key
    this.suggestions.forEach((candidate, i) => {
      candidate.key = i;
    });
  }

  getSelectionIndex() {
    return this.selectionIndex;
  }

  getKeyboardKeysToIgnore() {
    if (this.suggestions.length === 0) {
      return [];
    }

    return [AppConstants.Keys.DownArrow, AppConstants.Keys.UpArrow, AppConstants.Keys.RightArrow];
  }

  updateSelection(key) {
    // if the user chose an autocompletion on the previous keystroke, reset its value
    this.autoCompletedText = '';

    if (this.suggestions.length === 0) {
      this.selectionIndex = -1;
      return;
    }

    switch (key) {
      case AppConstants.Keys.DownArrow:
        this.selectionIndex = Math.min(this.suggestions.length - 1, this.selectionIndex + 1);
        break;

      case AppConstants.Keys.UpArrow:
        this.selectionIndex = Math.max(0, this.selectionIndex - 1);
        break;
    }
  }

  getAutoCompletedText() {
    return this.autoCompletedText;
  }
}

export default new AutoCompleteStore();
