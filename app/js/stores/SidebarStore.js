'use strict';

import Fuse from 'fuse.js';

import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';
import CommandStore from './CommandStore';

const searchOptions = {
  caseSensitive: false,
  includeScore: false,
  shouldSort: true,
  threshold: 0.2,
  keys: ['name']
};

class SidebarStore extends ChangeEmitter {
  constructor() {
    this.isShowing = true;
    this.searchResults = [];

    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {

        case AppConstants.SidebarActions.TOGGLE_SIDEBAR:
          this.isShowing = !this.isShowing;
          this.emitChange();
          break;

        case AppConstants.SidebarActions.SEARCH_DOCUMENTATION:
          // Perform a fuzzy search over stored commands by name
          let allCommands = CommandStore.getAll();
          this.searchResults = new Fuse(allCommands.map(cmd => cmd.name), searchOptions).search(payload.query).map(id => allCommands[id]);
          this.emitChange();
          break;
      }
    });
  }

  getSearchResults() {
    return this.searchResults;
  }
}

export default new SidebarStore();
