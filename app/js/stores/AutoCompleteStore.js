'use strict';

import assign from 'object-assign';
import Fuse from 'fuse.js';

import TerminalDispatcher from '../dispatchers/TerminalDispatcher';
import TerminalConstants from '../constants/TerminalConstants';

import CommandStore from './CommandStore';
import EnteredCommandStore from './EnteredCommandStore';

import ChangeEmitter from '../mixins/ChangeEmitter';

var AppActions = TerminalConstants.AppActions;
var ShellActions = TerminalConstants.ShellActions;

var fuzzySearch;
var searchOptions = {
  caseSensitive: false,
  includeScore: false,
  shouldSort: true,
  threshold: 0.2,
  keys: ['name']
};

var _candidates = [];
var _selectionIndex = -1;

var AutoCompleteStore = assign({}, ChangeEmitter, {
  init(commands) {
    fuzzySearch = new Fuse(commands, searchOptions);
  },

  getCandidates: function() {
    return _candidates;
  },

  updateCandidates: function(enteredText) {
    if (fuzzySearch === undefined) {
      return;
    }

    // do a fuzzy search for the text the user has entered
    _candidates = fuzzySearch.search(enteredText);

    // give each candidate a unique key
    _candidates.forEach(function(candidate, i) {
      candidate.key = i;
    });
  },

  getSelectionIndex: function() {
    return _selectionIndex;
  },

  updateSelection: function(key) {
    if (_candidates.length === 0) {
      _selectionIndex = -1;
      return;
    }

    switch (key) {
      case "\u001B[B":
        _selectionIndex = Math.max(_candidates.length - 1, _selectionIndex + 1);
        break;
      case "\u001B[A":
        _selectionIndex = Math.min(0, _selectionIndex - 1);
        break;
    }
  }
});

AutoCompleteStore.dispatchToken = TerminalDispatcher.register(function(payload) {
  switch (payload.action) {
    case AppActions.SEND_RAW_COMMANDS:
      TerminalDispatcher.waitFor([CommandStore.dispatchToken]);
      AutoCompleteStore.init(CommandStore.getAll());
      AutoCompleteStore.emitChange();
      break;

    case ShellActions.TYPE_KEY:
      TerminalDispatcher.waitFor([EnteredCommandStore.dispatchToken]);
      AutoCompleteStore.updateCandidates(EnteredCommandStore.get());
      AutoCompleteStore.updateSelection(payload.key);
      AutoCompleteStore.emitChange();
      break;
  }
});

export default AutoCompleteStore;