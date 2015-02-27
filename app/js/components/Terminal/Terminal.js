import React from 'react';
import TerminalJS from 'term.js';
import pty from 'pty.js';

var Terminal = React.createClass({
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
      rows: 24,
      screenKeys: true
    });

    shell.on('data', term.write);
    term.on('data', shell.write);

    var domNode = this.getDOMNode();
    term.open(domNode);
  },
  render() {
    return (<div>Terminal</div>);
  }
});

export default Terminal;
