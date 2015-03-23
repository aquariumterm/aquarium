'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import {ShellActions, AppActions} from '../constants/AppConstants';

export default {

  /* Shell Actions */

  typeKey: key => {
    AppDispatcher.dispatch({
      action: ShellActions.TYPE_KEY,
      key: key
    });
  },

  /**
   * Receive output from the host shell
   *
   * @param output
   */
  receiveOutput: output => {
    AppDispatcher.dispatch({
      action: ShellActions.OUTPUT_RECEIVED,
      output: output
    });
  },

  /* App Actions */

  sendRawCommands: commands => {
    AppDispatcher.dispatch({
      action: AppActions.SEND_RAW_COMMANDS,
      commands: commands
    });
  }
};
