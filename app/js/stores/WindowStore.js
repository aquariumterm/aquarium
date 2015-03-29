'use strict';

import Terminal from 'term.js';

import packageJson from '../../package.json';
import TerminalActions from '../actions/TerminalActions';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

class TerminalStore extends ChangeEmitter {
  constructor() {
    let gui = global.window.nwDispatcher.requireNwGui();
    this.win = gui.Window.get();

    /*
     * Enable OS X menus
     */
    if (process.platform === 'darwin') {
      let nativeMenu = new gui.Menu({type: 'menubar'});
      nativeMenu.createMacBuiltin(packageJson.name);
      this.win.menu = nativeMenu;
    }

    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {
        case AppConstants.AppActions.ATTACH_TERMINAL:
          // Set window width to double, to leave room for documentation pane
          this.resizeWindow(payload.width * 2, payload.height);
          this.emitChange();
          break;

        case AppConstants.AppActions.RESIZE_WINDOW:
          this.resizeWindow(payload.width, payload.height);
          this.emitChange();
          break;
      }
    });
  }

  getDispatchToken() {
    return this.dispatchToken;
  }

  getWidth() {
    return this.win.width;
  }

  getHeight() {
    return this.win.height;
  }

  resizeWindow(width, height) {
    this.win.width = width;
    this.win.height = height;
  }
}

export default new TerminalStore();
