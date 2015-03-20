'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

class SidebarStore extends ChangeEmitter {
  constructor() {
    this.isShowing = false;
    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {

        case TerminalConstants.AppActions.TOGGLE_SIDEBAR:
          this.isShowing = !this.isShowing;
          this.emitChange();
          break;
      }
    });
  }
}

export default new SidebarStore();
