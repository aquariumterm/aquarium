'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import SidebarActions from './SidebarActions';
import {ShellActions, AppActions} from '../constants/AppConstants';

export default {

  attachTerminal: (width, height) => {
    AppDispatcher.dispatch({
      action: AppActions.ATTACH_TERMINAL,
      width: width,
      height: height
    });
  },

  /* Shell Actions */

  typeKey: key => {
    AppDispatcher.dispatch({
      action: ShellActions.TYPE_KEY,
      key: key
    });
  },

  sendRawData: data => {
    AppDispatcher.dispatch({
      action: ShellActions.SEND_RAW_DATA,
      data: data
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
