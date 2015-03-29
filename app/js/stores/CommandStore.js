/**
 * Stores a list of command quick documentation: name, description, and examples
 */

'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

class CommandStore extends ChangeEmitter {
  constructor() {
    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {

        case AppConstants.AppActions.SEND_RAW_COMMANDS:
          this.commands = payload.commands;
          this.emitChange();
          break;
      }
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
