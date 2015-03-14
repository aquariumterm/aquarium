'use strict';

import React from 'react';
import TerminalJS from 'term.js';
import pty from 'pty.js';

import TerminalActionCreator from '../actions/TerminalActionCreator';

import TerminalConstants from '../constants/TerminalConstants';

import CommandStore from '../stores/CommandStore';
import EnteredCommandStore from '../stores/EnteredCommandStore';
import AutoCompleteStore from '../stores/AutoCompleteStore';

import AutoCompleteSuggestion from './AutoCompleteSuggestion';

var shell;
var term;

var getTerminalState = function() {
  return {
    commands: CommandStore.getAll(),
    suggestions: AutoCompleteStore.getSuggestions(),
    selectedIndex: AutoCompleteStore.getSelectionIndex(),
    enteredCommand: EnteredCommandStore.get(),
    autocompletedText: AutoCompleteStore.getAutocompletedText(),

    // TODO: The view should not be handling logic for ignoring keys that we don't want to write to the shell.
    // Break interaction with the shell out into a store so we can make this cleaner.
    ignoredKeys: AutoCompleteStore.getKeyboardKeysToIgnore()
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

    var numSuggestions = this.state.suggestions.length;
    var rowHeight = term.element.clientHeight / term.rows;
    var shouldRenderAbove = term.y + numSuggestions >= term.rows;

    var currentRowY = term.y * rowHeight;
    var suggestionListHeight = numSuggestions * rowHeight;
    var suggestionListStartY = shouldRenderAbove ? currentRowY - rowHeight - suggestionListHeight : currentRowY + rowHeight ;

    return {
      position: "absolute",
      listStyleType: "none",
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

    // send any output from the shell to the client
    shell.on('data', (data) => {
      term.write(data);
      TerminalActionCreator.receiveOutput(data);
    });

    // write any input from the client to the shell
    term.on('data', (data) => {
      this.writeKey(data);

      // HACK: do an update to the shell for autocomplete logic on each render,
      // such as filling in the chosen autocomplete option
      if (this.state.autocompletedText !== "") {

        // save properties before clearing the buffer mutates their values
        var autocompletedText = this.state.autocompletedText;
        var bufferLength = this.state.enteredCommand.length;

        // clear the user's currently entered text (buffer)
        for (let i = 0; i < bufferLength; i++) {
          this.writeKey(TerminalConstants.Keys.Backspace);
        }

        this.writeText(autocompletedText);
      }
    });

    term.open(this.getDOMNode());

    CommandStore.addChangeListener(this._onChange);
    AutoCompleteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CommandStore.removeChangeListener(this._onChange);
    AutoCompleteStore.removeChangeListener(this._onChange);
  },


  writeKey(key) {
    if (this.state.ignoredKeys.indexOf(key) === -1) {
      shell.write(key);
    }

    TerminalActionCreator.typeKey(key);
  },

  writeText(text) {
    for (let i = 0; i < text.length; i++) {
      this.writeKey(text[i]);
    }
  },

  render() {
    // HACK: Force the terminal to call its ondata handler so we can call actions(React won't let us within render)
    // to do some autocompletion logic.
    if (term) {
      term.write("");
    }

    return (
      <div style={this._mainStyle()}>
        <div></div>

        <ul style={this._suggestionListStyle()}>
          {this.state.suggestions.map(function(suggestion, i) {
            suggestion.selected = i === this.state.selectedIndex;
            return <AutoCompleteSuggestion key={suggestion.id} data={suggestion} />;
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
