'use strict';

import assign from 'object-assign';
import Fuse from 'fuse.js';

import AppDispatcher from '../dispatchers/AppDispatcher';
import TerminalConstants from '../constants/TerminalConstants';

import CommandStore from './CommandStore';
import EnteredCommandStore from './EnteredCommandStore';

import ChangeEmitter from '../mixins/ChangeEmitter';

var fuzzySearch;
var searchOptions = {
  caseSensitive: false,
  includeScore: false,
  shouldSort: true,
  threshold: 0.2,
  keys: ['name']
};

// all the suggestions for autocompletion based on the currently entered text
var _suggestions = [];

// the index of the autocompletion suggestion the user currently has selected
// Should be -1 if there is no selection
var _selectionIndex = -1;

// any text that was filled in from choosing an autocomplete choice. This text needs
// to be written to the shell.
var _autoCompletedText = "";

var AutoCompleteStore = assign({}, ChangeEmitter, {
  init(commands) {
    fuzzySearch = new Fuse(commands, searchOptions);
  },

  getSuggestions() {
    return _suggestions;
  },

  updateSuggestions(enteredText) {
    if (fuzzySearch === undefined) {
      return;
    }

    // do a fuzzy search for the text the user has entered
    _suggestions = fuzzySearch.search(enteredText);

    // give each candidate a unique key
    _suggestions.forEach(function(candidate, i) {
      candidate.key = i;
    });
  },

  getSelectionIndex() {
    return _selectionIndex;
  },

  getKeyboardKeysToIgnore() {
    if (_suggestions.length === 0) {
      return [];
    }

    return [TerminalConstants.Keys.DownArrow, TerminalConstants.Keys.UpArrow, TerminalConstants.Keys.RightArrow];
  },

  updateSelection(key) {
    // if the user chose an autocompletion on the previous keystroke, reset its value
    _autoCompletedText = "";

    if (_suggestions.length === 0) {
      _selectionIndex = -1;
      return;
    }

    switch (key) {
      case TerminalConstants.Keys.DownArrow:
        _selectionIndex = Math.min(_suggestions.length - 1, _selectionIndex + 1);
        break;

      case TerminalConstants.Keys.UpArrow:
        _selectionIndex = Math.max(0, _selectionIndex - 1);
        break;

      // HACK: to avoid interfering with the EnteredCommandStore's logic, which uses the enter key to clear the buffer,
      // use RightArrow for autocomplete for now
      case TerminalConstants.Keys.RightArrow:
        if (_selectionIndex !== -1) {
          _autoCompletedText = _suggestions[_selectionIndex].name;
          _selectionIndex = -1;
        }
        break;
    }
  },

  getAutocompletedText() {
    return _autoCompletedText;
  }
});

AutoCompleteStore.dispatchToken = AppDispatcher.register(function(payload) {
  switch (payload.action) {
    case TerminalConstants.AppActions.SEND_RAW_COMMANDS:
      AppDispatcher.waitFor([CommandStore.dispatchToken]);
      AutoCompleteStore.init(CommandStore.getAll());
      AutoCompleteStore.emitChange();
      break;

    case TerminalConstants.ShellActions.TYPE_KEY:
      AppDispatcher.waitFor([EnteredCommandStore.dispatchToken]);
      AutoCompleteStore.updateSuggestions(EnteredCommandStore.get());
      AutoCompleteStore.updateSelection(payload.key);
      AutoCompleteStore.emitChange();
      break;
  }
});

export default AutoCompleteStore;