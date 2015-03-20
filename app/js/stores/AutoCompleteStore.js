'use strict';

import Fuse from 'fuse.js';

import AppDispatcher from '../dispatchers/AppDispatcher';
import TerminalConstants from '../constants/TerminalConstants';

import CommandStore from './CommandStore';
import EnteredCommandStore from './EnteredCommandStore';

import ChangeEmitter from '../mixins/ChangeEmitter';

const searchOptions = {
  caseSensitive: false,
  includeScore: false,
  shouldSort: true,
  threshold: 0.2,
  keys: ['name']
};

class AutoCompleteStore extends ChangeEmitter {
  constructor() {
    // all the suggestions for autocompletion based on the currently entered text
    this.suggestions = [];

    // the index of the autocompletion suggestion the user currently has selected
    // Should be -1 if there is no selection
    this.selectionIndex = -1;

    // any text that was filled in from choosing an autocomplete choice. This text needs
    // to be written to the shell.
    this.autoCompletedText = "";

    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {
        case TerminalConstants.AppActions.SEND_RAW_COMMANDS:
          AppDispatcher.waitFor([CommandStore.getDispatchToken()]);
          this.init(CommandStore.getAll());
          this.emitChange();
          break;

        case TerminalConstants.ShellActions.TYPE_KEY:
          AppDispatcher.waitFor([EnteredCommandStore.getDispatchToken()]);
          this.updateSuggestions(EnteredCommandStore.get());
          this.updateSelection(payload.key);
          this.emitChange();
          break;
      }
    });
  }

  init(commands) {
    this.fuzzySearch = new Fuse(commands, searchOptions);
  }

  getSuggestions() {
    return this.suggestions;
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

    return [TerminalConstants.Keys.DownArrow, TerminalConstants.Keys.UpArrow, TerminalConstants.Keys.RightArrow];
  }

  updateSelection(key) {
    // if the user chose an autocompletion on the previous keystroke, reset its value
    this.autoCompletedText = "";

    if (this.suggestions.length === 0) {
      this.selectionIndex = -1;
      return;
    }

    switch (key) {
      case TerminalConstants.Keys.DownArrow:
        this.selectionIndex = Math.min(this.suggestions.length - 1, this.selectionIndex + 1);
        break;

      case TerminalConstants.Keys.UpArrow:
        this.selectionIndex = Math.max(0, this.selectionIndex - 1);
        break;

      // HACK: to avoid interfering with the EnteredCommandStore's logic, which uses the enter key to clear the buffer,
      // use RightArrow for autocomplete for now
      case TerminalConstants.Keys.RightArrow:
        if (this.selectionIndex !== -1) {
          this.autoCompletedText = this.suggestions[this.selectionIndex].name;
          this.selectionIndex = -1;
        }
        break;
    }
  }

  getAutoCompletedText() {
    return this.autoCompletedText;
  }
}

export default new AutoCompleteStore();
