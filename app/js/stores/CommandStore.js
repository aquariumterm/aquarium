/**
 * Stores a list of command quick documentation: name, description, and examples
 */

'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

class CommandStore extends ChangeEmitter {
  constructor() {
    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {

        case TerminalConstants.AppActions.SEND_RAW_COMMANDS:
          this.init(payload.commands);
          this.emitChange();
          break;
      }
    });
  }

  init(rawCommands) {
    this.commands = rawCommands.map(command => {
      return {
        name: command.commandName,
        description: command.description,
        examples: command.examples
      };
    });
  }

  getDispatchToken() {
    return this.dispatchToken;
  }

  get(id) {
    return this.commands[id];
  }

  getAll() {
    return this.commands;
  }
}

export default new CommandStore();
