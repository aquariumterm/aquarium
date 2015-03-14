'use strict';

import assign from 'object-assign';

import TerminalDispatcher from '../dispatchers/TerminalDispatcher';
import TerminalConstants from '../constants/TerminalConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

var Keys = TerminalConstants.Keys;

// HACK: This entire store is a hack to keep track of the text that the user has entered, since there was no property
// for that in the APIs term.js and pty.js expose to us. After further reflection, I think we can find the entered text by figuring out what
// the user's shell prompt is, getting the text in the current row in the terminal(you can find examples of this in the
// term.js codebase) and removing the prompt from that text.

// the text that the user has entered after the command prompt
var _text = '';

// the index of the user's cursor. Could probably be retrieved from term.js or pty.js instead.
var _cursor = 0;

// keys that we don't want to write into the buffer of text entered by the user.
var _blacklist = [TerminalConstants.Keys.UpArrow, TerminalConstants.Keys.DownArrow];

var EnteredCommandStore = assign({}, ChangeEmitter, {
  get: function() {
    return _text;
  },

  updateText: function(key) {
    switch (key) {
      case Keys.Enter:
        _text = "";
        _cursor = 0;
        break;

      case Keys.LeftArrow:
        _cursor = Math.max(-1, _cursor - 1);
        break;

      case Keys.RightArrow:
        _cursor = Math.min(_text.length - 1, _cursor + 1);
        break;

      case Keys.Backspace:
        if (_cursor >= 0) {
          _text = _text.removeAt(_cursor);
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