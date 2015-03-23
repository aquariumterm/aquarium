'use strict';

import {SidebarActions} from '../constants/AppConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';

export default {
  toggleSidebar: () => {
    AppDispatcher.dispatch({
      action: SidebarActions.TOGGLE_SIDEBAR
    });
  },

  searchDocumentation: (query) => {
    AppDispatcher.dispatch({
      action: SidebarActions.SEARCH_DOCUMENTATION,
      query: query
    });
  }
};
