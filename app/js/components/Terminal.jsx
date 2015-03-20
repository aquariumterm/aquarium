'use strict';

import React from 'react';
import TerminalJS from 'term.js';
import pty from 'pty.js';

var Terminal = React.createClass({
  /** Styles */
  mainStyle() {
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
    term.on('data', (data) => {
      shell.write(data);
      if (data.charCodeAt(0) === 0){
         //make a toggle action later
        var s = document.getElementById('sidebar');
        if(s.style.display === 'block'){
          s.style.display = 'none';
          window.resizeTo(640, 450);
        }
        else{
          s.style.display = 'block';
          window.resizeTo(840, 450);
        }
      }
    });

    term.open(this.getDOMNode());
  },
  render() {
    return (<div className="Terminal" style={this.mainStyle()}></div>);
  }
});

export default Terminal;
