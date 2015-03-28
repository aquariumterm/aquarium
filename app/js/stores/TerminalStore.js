'use strict';

import Terminal from 'term.js';

import TerminalActions from '../actions/TerminalActions';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

class TerminalStore extends ChangeEmitter {
  constructor() {
    this.term = new Terminal({
      cols: 132,
      rows: 46,
      screenKeys: true
    });

    this.widthPixels = 0;
    this.heightPixels = 0;
    this.isTerminalAttached = false;

    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {
        case AppConstants.ShellActions.OUTPUT_RECEIVED:
          if (this.isTerminalAttached) {
            this.term.write(payload.output);
          }
          this.emitChange();
          break;

        case AppConstants.AppActions.ATTACH_TERMINAL:
          this.isTerminalAttached = true;
          this.widthPixels = payload.width;
          this.heightPixels = payload.height;
          this.resizeWindow();
          this.emitChange();
      }
    });
  }

  getDispatchToken() {
    return this.dispatchToken;
  }

  getTerminal() {
    return this.term;
  }

  getWidth() {
    return this.widthPixels;
  }

  getHeight() {
    return this.heightPixels;
  }

  resizeWindow() {
    window.resizeTo(this.widthPixels, this.heightPixels);
  }
}

export default new TerminalStore();
