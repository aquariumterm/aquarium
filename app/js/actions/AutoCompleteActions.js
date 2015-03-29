'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import {Actions} from '../constants/AutoCompleteConstants';

export default {

  selectPrev() {
    AppDispatcher.dispatch({
      action: Actions.SELECT_PREV
    });
  },

  selectNext() {
    AppDispatcher.dispatch({
      action: Actions.SELECT_NEXT
    });
  },

  selectSuggestion(index) {
    AppDispatcher.dispatch({
      action: Actions.SELECT_SUGGESTION,
      index: index
    });
  },

  confirmSuggestion(index) {
    if (index >= 0) {
      AppDispatcher.dispatch({
        action: Actions.CONFIRM_SUGGESTION,
        index: index
      });
    } else {
      console.debug('You must confirm a suggestion with index >= 0');
    }
  },

  closeSuggestions() {
    AppDispatcher.dispatch({
      action: Actions.CLOSE_SUGGESTIONS
    });
  }

};
