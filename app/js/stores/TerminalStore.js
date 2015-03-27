'use strict';

import Terminal from 'term.js';

import TerminalActions from '../actions/TerminalActions';
import AppDispatcher from '../dispatchers/AppDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

class TerminalStore extends ChangeEmitter {
  constructor() {
    this.term = new Terminal({
      cols: 80,
      rows: 30,
      screenKeys: true
    });

    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {
        case TerminalConstants.ShellActions.OUTPUT_RECEIVED:
          this.term.write(payload.output);
          this.emitChange();
          break;
      }
    });
  }

  getDispatchToken() {
    return this.dispatchToken;
  }

  getTerminal() {
    return this.term;
  }
}

export default new TerminalStore();
