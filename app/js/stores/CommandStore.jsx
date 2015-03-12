'use strict';

import TerminalDispatcher from '../dispatchers/TerminalDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

var _commands = [];

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
  }
});

CommandStore.dispatchToken = TerminalDispatcher.register(function(payload) {
  switch (payload.action) {

    case TerminalConstants.AppActions.SEND_RAW_COMMANDS:
      CommandStore.init(payload.commands);
      CommandStore.emitChange();
      break;
  }
});

export default CommandStore;
