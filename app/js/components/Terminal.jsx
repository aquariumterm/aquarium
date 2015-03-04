'use strict';

import React from 'react';
import TerminalJS from 'term.js';
import pty from 'pty.js';

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

    shell.on('data', (data) => term.write(data));
    term.on('data', (data) => shell.write(data));

    term.open(this.getDOMNode());
  },
  render() {
    return (<div style={this._main()}></div>);
  }
});

export default Terminal;
