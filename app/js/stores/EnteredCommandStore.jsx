'use strict';

import { EventEmitter } from 'events';
import assign from 'object-assign';

import TerminalDispatcher from '../dispatchers/TerminalDispatcher';
import TerminalConstants from '../constants/TerminalConstants';

var CHANGE_EVENT = 'change';

var _text = '';

var EnteredCommandStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

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