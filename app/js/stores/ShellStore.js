'use strict';

import pty from 'pty.js';

import TerminalActions from '../actions/TerminalActions';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

import AutoCompleteStore from '../stores/AutoCompleteStore';

class ShellStore extends ChangeEmitter {
  constructor() {
    this.shell = pty.spawn('bash', [], {
      name: 'xterm-color',
      cols: 80,
      rows: 46,
      cwd: process.env.HOME,
      env: process.env
    });

    this.shell.on('data', data => TerminalActions.receiveOutput(data));

    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {
        case AppConstants.ShellActions.TYPE_KEY:
          this.write(payload.key);
          this.emitChange();
          break;

        case AppConstants.ShellActions.SEND_RAW_DATA:
          this.write(payload.data);
          this.emitChange();
          break;
      }
    });
  }

  getDispatchToken() {
    return this.dispatchToken;
  }

  write(data) {
    this.shell.write(data);
  }
}

export default new ShellStore();
