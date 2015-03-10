'use strict';

import TerminalDispatcher from '../dispatchers/TerminalDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import Fuse from 'fuse.js';

var ShellActions = TerminalConstants.ShellActions;
var AppActions = TerminalConstants.AppActions;

var CHANGE_EVENT = 'change';

var _commands = [];
var _candidates = [];
var _text = '';

var fuzzySearch;
var searchOptions = {
  caseSensitive: false,
  includeScore: false,
  shouldSort: true,
  threshold: 0.6,
  keys: ['name']
};

var CommandStore = assign({}, EventEmitter.prototype, {
  init: function(rawCommands) {
    _commands = [];

    for (var i = 0; i < rawCommands.length; i++) {
      var command = rawCommands[i];

      _commands.push({
        key: i,
        name: command.commandName,
        description: command.description,
        examples: command.examples
      });
    }

    fuzzySearch = new Fuse(_commands, searchOptions);
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

  get: function(id) {
    return _commands[id];
  },

  getAll: function() {
    return _commands;
  },

  // TODO: Autocompletion can be separated away from the commands
  getAutocompletionCandidates: function() {
    return _candidates;
  },

  updateAutocompletionCandidates: function() {
    if (fuzzySearch === undefined) {
      _candidates = [];
      return;
    }

    // do a fuzzy search for the text the user has entered
    _candidates = fuzzySearch.search(_text);

    // give each candidate a unique key
    _candidates.forEach(function(candidate, i) {
      candidate.key = i;
    });
  },

  // TODO: The current text being typed by the user can be separated away from the commands
  updateText: function(key) {
    if (key === '\r') {
      _text = "";
    } else if (key === '\u007F') {
      _text = _text.substring(0, _text.length - 1);
    } else {
      _text += key;
    }
  }
});

CommandStore.dispatchToken = TerminalDispatcher.register(function(payload) {

  var action = payload.action;

  switch (action) {
    case ShellActions.TYPE_KEY:
      CommandStore.updateText(payload.key);
      CommandStore.updateAutocompletionCandidates();
      CommandStore.emitChange();
      break;

    case AppActions.SEND_RAW_COMMANDS:
      CommandStore.init(payload.commands);
      CommandStore.emitChange();
      break;

    default:
      // do nothing
  }
});

export default CommandStore;
