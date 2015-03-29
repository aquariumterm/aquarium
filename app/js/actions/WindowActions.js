'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import {AppActions} from '../constants/AppConstants';

export default {

  resizeWindow: (width, height) => {
    AppDispatcher.dispatch({
      action: AppActions.RESIZE_WINDOW,
      width: width,
      height: height
    });
  }

};
