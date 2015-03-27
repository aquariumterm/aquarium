'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import {Actions} from '../constants/AutoCompleteConstants';

export function selectSuggestion(index) {
  AppDispatcher.dispatch({
    action: Actions.SELECT_SUGGESTION,
    index: index
  });
}
