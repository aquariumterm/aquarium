'use strict';

import assign from 'object-assign';

import AppDispatcher from '../dispatchers/AppDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

var _commands = [];

var CommandStore = assign({}, ChangeEmitter, {
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

  get: function(id) {
    return _commands[id];
  },

  getAll: function() {
    return _commands;
  }
});

CommandStore.dispatchToken = AppDispatcher.register(function(payload) {
  switch (payload.action) {

    case TerminalConstants.AppActions.SEND_RAW_COMMANDS:
      CommandStore.init(payload.commands);
      CommandStore.emitChange();
      break;
  }
});

export default CommandStore;
