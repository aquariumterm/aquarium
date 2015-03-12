'use strict';

import { EventEmitter } from 'events';
import assign from 'object-assign';
import Fuse from 'fuse.js';

import TerminalDispatcher from '../dispatchers/TerminalDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import CommandStore from './CommandStore';
import EnteredCommandStore from './EnteredCommandStore';

var AppActions = TerminalConstants.AppActions;
var ShellActions = TerminalConstants.ShellActions;

var CHANGE_EVENT = 'change';


var fuzzySearch;
var searchOptions = {
  caseSensitive: false,
  includeScore: false,
  shouldSort: true,
  threshold: 0.2,
  keys: ['name']
};

var _candidates = [];

var AutoCompleteStore = assign({}, EventEmitter.prototype, {
  init(commands) {
    fuzzySearch = new Fuse(commands, searchOptions);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCandidates: function() {
    return _candidates;
  },

  updateCandidates: function(enteredText) {
    if (fuzzySearch === undefined) {
      _candidates = [];
      return;
    }

    // do a fuzzy search for the text the user has entered
    _candidates = fuzzySearch.search(enteredText);

    // give each candidate a unique key
    _candidates.forEach(function(candidate, i) {
      candidate.key = i;
    });
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
      AutoCompleteStore.emitChange();
      break;
  }
});

export default AutoCompleteStore;