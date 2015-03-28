'use strict';

import keyMirror from 'react/lib/keyMirror';

import knownCommands from './knownCommands';

export default {
  ShellActions: keyMirror({
    TYPE_KEY: null,
    OUTPUT_RECEIVED: null
  }),

  AppActions: keyMirror({
    SEND_RAW_COMMANDS: null,
    ATTACH_TERMINAL: null
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

/*
  KnownCommands: [
    { commandName: 'ls', description: 'List the contents of a directory', examples: ['ls -ah'] },
    { commandName: 'cd', description: 'Change the current working directory', examples: ['cd code/'] },
    { commandName: 'cp', description: 'Copy a file\'s contents into another file', examples: ['cp file1.txt file1_copy.txt'] },
    { commandName: 'clear', description: 'Clear the output of the terminal', examples: ['clear'] }
  ]*/
};
