import keymirror from 'react/lib/keyMirror';

export default {
  ShellActions: keymirror({
    TYPE_KEY: null,
    OUTPUT_RECEIVED: null
  }),

  AppActions: keymirror({
    SEND_RAW_COMMANDS: null
  }),

  PayloadSources: keymirror({
    SHELL_ACTION: null,
    APP_ACTION: null
  }),

  KnownCommands: [
    { commandName: "ls", description: "List the contents of a directory", examples: ["ls -ah"] },
    { commandName: "cd", description: "Change the current working directory", examples: ["cd code/"] },
    { commandName: "cp", description: "Copy a file's contents into another file", examples: ["cp file1.txt file1_copy.txt"] },
    { commandName: "clear", description: "Clear the output of the terminal", examples: ["clear"] }
  ]
};