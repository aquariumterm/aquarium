'use strict';

import TerminalDispatcher from '../dispatchers/TerminalDispatcher';
import TerminalConstants from '../constants/TerminalConstants';

var ShellActions = TerminalConstants.ShellActions;
var AppActions = TerminalConstants.AppActions;

export default {

  /* Shell Actions */

  typeKey: function(key) {
    TerminalDispatcher.dispatch({
      action: ShellActions.TYPE_KEY,
      key: key
    });
  },

  receiveOutput: function(output) {
    TerminalDispatcher.dispatch({
      action: ShellActions.OUTPUT_RECEIVED,
      output: output
    });
  },

  /* App Actions */

  sendRawCommands: function(commands) {
    TerminalDispatcher.dispatch({
      action: AppActions.SEND_RAW_COMMANDS,
      commands: commands
    });

    console.log(TerminalDispatcher.isDispatching());
  }
};
