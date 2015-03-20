'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import {AutoCompleteActions} from '../constants/AutoCompleteConstants';

export function selectSuggestion(index) {
  AppDispatcher.dispatch({
    action: AutoCompleteActions.SELECT_SUGGESTION,
    index: index
  });
}
