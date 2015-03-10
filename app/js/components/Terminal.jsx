'use strict';

import React from 'react';
import TerminalJS from 'term.js';
import pty from 'pty.js';

import TerminalActionCreator from '../actions/TerminalActionCreator';
import '../stores/CommandStore';

var Terminal = React.createClass({
  /** Styles */
  _main() {
    return {
      fontFamily: 'monospace'
    };
  },

  componentDidMount() {
    var shell = pty.spawn('bash', [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env
    });

    var term = new TerminalJS({
      cols: 80,
      rows: 30,
      screenKeys: true
    });

    shell.on('data', (data) => {
      term.write(data);
      TerminalActionCreator.receiveOutput(data);
    });

    term.on('data', (data) => {
      shell.write(data);
      TerminalActionCreator.typeKey(data);

      //if (currentLine === "ls" && allowAutoComplete) {
      //  React.render(
      //    <div>Hello</div>,
      //    term.element.childNodes.item(term.y === term.rows - 1 ? term.y - 1 : term.y + 1)
      //  );
      //}
    });

    term.open(this.getDOMNode());
  },

  render() {
    return (
      <div style={this._main()}>
      </div>
    );
  }
});

export default Terminal;
