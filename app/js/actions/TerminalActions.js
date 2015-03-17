'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import TerminalConstants from '../constants/TerminalConstants';

var ShellActions = TerminalConstants.ShellActions;
var AppActions = TerminalConstants.AppActions;

export default {

  /* Shell Actions */

  typeKey: function(key) {
    AppDispatcher.dispatch({
      action: ShellActions.TYPE_KEY,
      key: key
    });
  },

  receiveOutput: function(output) {
    AppDispatcher.dispatch({
      action: ShellActions.OUTPUT_RECEIVED,
      output: output
    });
  },

  /* App Actions */

  sendRawCommands: function(commands) {
    AppDispatcher.dispatch({
      action: AppActions.SEND_RAW_COMMANDS,
      commands: commands
    });
  }
};
