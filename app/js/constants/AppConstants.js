'use strict';

import keyMirror from 'react/lib/keyMirror';

import knownCommands from './knownCommands.json';

export default {
  ShellActions: keyMirror({
    TYPE_KEY: null,
    OUTPUT_RECEIVED: null
  }),

  AppActions: keyMirror({
    SEND_RAW_COMMANDS: null,
    ATTACH_TERMINAL: null,
    RESIZE_WINDOW: null
  }),

  SidebarActions: keyMirror({
    TOGGLE_SIDEBAR: null,
    SEARCH_DOCUMENTATION: null
  }),

  Keys: {
    DownArrow: '\u001B[B',
    UpArrow: '\u001B[A',
    LeftArrow: '\u001B[D',
    RightArrow: '\u001B[C',
    Backspace: '\u007F',
    Enter: '\r'
  },

  KnownCommands: knownCommands
};
