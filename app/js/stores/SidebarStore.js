'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';
import CommandStore from './CommandStore';

class SidebarStore extends ChangeEmitter {
  constructor() {
    this.isShowing = false;
    this.searchResults = [];

    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {

        case AppConstants.SidebarActions.TOGGLE_SIDEBAR:
          this.isShowing = !this.isShowing;
          this.emitChange();
          break;

        case AppConstants.SidebarActions.SEARCH_DOCUMENTATION:

          // due to time constraints, do an exact search as opposed to a fuzzy search for now
          this.searchResults = [];

          var commands = CommandStore.getAll();
          for (let i = 0; i < commands.length; i++) {
            if (commands[i].name === payload.query) {
              this.searchResults.push(commands[i]);
            }
          }

          this.emitChange();
          break;
      }
    });
  }
}

export default new SidebarStore();
