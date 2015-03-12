'use strict';

import assign from 'object-assign';

import TerminalDispatcher from '../dispatchers/TerminalDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

var _text = '';

var EnteredCommandStore = assign({}, ChangeEmitter, {
  get: function() {
    return _text;
  },

  updateText: function(key) {
    if (key === '\r') {
      _text = "";
    } else if (key === '\u007F') {
      _text = _text.substring(0, _text.length - 1);
    } else {
      _text += key;
    }
  }
});

EnteredCommandStore.dispatchToken = TerminalDispatcher.register(function(payload) {
  switch (payload.action) {
    case TerminalConstants.ShellActions.TYPE_KEY:
      EnteredCommandStore.updateText(payload.key);
      EnteredCommandStore.emitChange();
      break;
  }
});

export default EnteredCommandStore;