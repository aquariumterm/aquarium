'use strict';

import TerminalDispatcher from '../dispatchers/TerminalDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var ShellActions = TerminalConstants.ShellActions;
var AppActions = TerminalConstants.AppActions;

var CHANGE_EVENT = 'change';

var _commands = {};
var _candidates = [];
var _text = "";

var CommandStore = assign({}, EventEmitter.prototype, {
  init: function(rawCommands) {
    rawCommands.forEach(function(command) {
      var commandID = command.commandID;
      _commands[commandID] = {
        id: commandID,
        name: command.commandName,
        description: command.description,
        examples: command.examples
      };
    }, this);
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
    _candidates = [_commands[0]];
  },

  // TODO: The current text being typed by the user can be separated away from the commands
  updateText: function(key) {
    if (key === '\r') {
      _text = "";
    } else {
      _text += key;
    }

    console.log("Text is now " + _text);
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
