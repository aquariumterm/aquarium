'use strict';

import assign from 'object-assign';

import AppDispatcher from '../dispatchers/AppDispatcher';
import {Keys, ShellActions} from '../constants/AppConstants';
import ChangeEmitter from '../mixins/ChangeEmitter';

// HACK: This entire store is a hack to keep track of the text that the user has entered, since there was no property
// for that in the APIs term.js and pty.js expose to us. After further reflection, I think we can find the entered text by figuring out what
// the user's shell prompt is, getting the text in the current row in the terminal(you can find examples of this in the
// term.js codebase) and removing the prompt from that text.
class EnteredCommandStore extends ChangeEmitter {
  constructor() {
    // the text that the user has entered after the command prompt
    this.text = '';

    // the index of the user's cursor. Could probably be retrieved from term.js or pty.js instead.
    this.cursor = 0;

    // keys that we don't want to write into the buffer of text entered by the user.
    this.blacklist = [Keys.UpArrow, Keys.DownArrow];

    this.dispatchToken = AppDispatcher.register(payload => {
      switch (payload.action) {
        case ShellActions.TYPE_KEY:
          this.updateText(payload.key);
          this.emitChange();
          break;
      }
    });
  }

  getDispatchToken() {
    return this.dispatchToken;
  }

  get() {
    return this.text;
  }

  updateText(key) {
    switch (key) {
      case Keys.Enter:
        this.text = '';
        this.cursor = 0;
        break;

      case Keys.LeftArrow:
        this.cursor = Math.max(-1, this.cursor - 1);
        break;

      case Keys.RightArrow:
        this.cursor = Math.min(this.text.length - 1, this.cursor + 1);
        break;

      case Keys.Backspace:
        if (this.cursor >= 0) {
          // Remove character at cursor
          this.text = this.text.slice(0, this.cursor) + this.text.slice(this.cursor + 1);
          this.cursor = Math.max(-1, this.cursor - 1);
        }

        break;

      default:
        if (this.blacklist.indexOf(key) === -1) {
          this.text += key;
          this.cursor++;
        }

        break;
    }
  }
}

export default new EnteredCommandStore();
