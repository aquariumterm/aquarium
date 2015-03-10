'use strict';

import React from 'react';
import TerminalJS from 'term.js';
import pty from 'pty.js';

import TerminalActionCreator from '../actions/TerminalActionCreator';
import TerminalStore from '../stores/TerminalStore';

import AutoCompleteSuggestion from './AutoCompleteSuggestion';

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
  _mainStyle() {
    return {
      fontFamily: 'monospace'
    };
  },

  _suggestionListStyle() {
    if (!term) {
      return;
    }

    var numSuggestions = this.state.candidates.length;
    var rowHeight = term.element.clientHeight / term.rows;
    var shouldRenderAbove = term.y + numSuggestions >= term.rows;

    var currentRowY = term.y * rowHeight;
    var suggestionListHeight = numSuggestions * rowHeight;
    var suggestionListStartY = shouldRenderAbove ? currentRowY - suggestionListHeight : currentRowY + suggestionListHeight;

    return {
      position: "absolute",
      "list-style-type": "none",
      left: 0,
      top: suggestionListStartY,
      height: suggestionListHeight
    };
  },

  /** Component Functions */

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
    return (
      <div style={this._mainStyle()}>
        <div></div>

        <ul style={this._suggestionListStyle()}>
          {this.state.candidates.map(function(candidate) {
            return <AutoCompleteSuggestion key={candidate.id} data={candidate} />;
          }.bind(this))}
        </ul>
      </div>
    );
  },

  _onChange() {
    this.setState(getTerminalState());
  }
});

export default Terminal;
