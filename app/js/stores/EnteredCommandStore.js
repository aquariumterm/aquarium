'use strict';

import assign from 'object-assign';

import TerminalDispatcher from '../dispatchers/TerminalDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

var _text = '';
var _cursor = 0;
var _blacklist = ['\u001B[A', '\u001B[B'];

var EnteredCommandStore = assign({}, ChangeEmitter, {
  get: function() {
    return _text;
  },

  updateText: function(key) {
    switch (key) {
      case '\r':
        _text = "";
        _cursor = 0;
        break;

      case '\u001B[D':
        _cursor = Math.max(-1, _cursor - 1);
        break;

      case '\u001B[C':
        _cursor = Math.min(_text.length - 1, _cursor + 1);
        break;

      case '\u007F':
        if (_cursor >= 0) {
          _text = _text.slice(0, _cursor) + _text.slice(_cursor + 1);
          _cursor = Math.max(-1, _cursor - 1);
        }
        break;

      default:
        if (_blacklist.indexOf(key) === -1) {
          _text += key;
          _cursor++;
        }

        break;
    }

    console.log("Cursor is at " + _cursor);
    console.log("Text is now " + _text);
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