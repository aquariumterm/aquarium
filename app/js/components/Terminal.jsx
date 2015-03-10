'use strict';

import React from 'react';
import TerminalJS from 'term.js';
import pty from 'pty.js';

import TerminalActionCreator from '../actions/TerminalActionCreator';
import TerminalStore from '../stores/TerminalStore';

var shell;
var term;

var getTerminalState = function() {
  return {
    commands: TerminalStore.getAll(),
    candidates: TerminalStore.getAutocompletionCandidates()
  };
};

var Terminal = React.createClass({
  /** Styles */
  _main() {
    return {
      fontFamily: 'monospace'
    };
  },

  getInitialState() {
    return getTerminalState();
  },

  componentDidMount() {
    shell = pty.spawn('bash', [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env
    });

    term = new TerminalJS({
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
    });

    term.open(this.getDOMNode());

    TerminalStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TerminalStore.removeChangeListener(this._onChange);
  },

  render() {
    if (this.isMounted()) {
      var numSuggestions = this.state.candidates.length;
      var renderSuggestionsAbove = term.y + numSuggestions >= term.rows;

      for (var i = 0; i < numSuggestions; i++) {
        React.render(
          <div>{this.state.candidates[i].name}</div>,
          term.element.childNodes.item(renderSuggestionsAbove ? term.y - numSuggestions + i : term.y + i + 1)
        );
      }
    }

    return (
      <div style={this._main()}>
      </div>
    );
  },

  _onChange() {
    this.setState(getTerminalState());
  }
});

export default Terminal;
