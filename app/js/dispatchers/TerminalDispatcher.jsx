'use strict';

//import TerminalConstants from '../constants/TerminalConstants';
import { Dispatcher } from 'flux';

//var PayloadSources = TerminalConstants.PayloadSources;
//
//var createHandler = function(source) {
//  return function(action) {
//    var payload = {
//      source: source,
//      action: action
//    };
//    this.dispatch(payload);
//  };
//};

var TerminalDispatcher = new Dispatcher();
//var TerminalDispatcher = assign(new Dispatcher(), {
//  handleShellAction: createHandler(PayloadSources.SHELL_ACTION),
//  handleAppAction: createHandler(PayloadSources.APP_ACTION)
//});

export default TerminalDispatcher;
