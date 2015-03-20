'use strict';

import React from 'react';
import TerminalJS from 'term.js';
import pty from 'pty.js';

import TerminalActions from '../actions/TerminalActions';
import {selectSuggestion} from '../actions/AutoCompleteActions';

import TerminalConstants from '../constants/TerminalConstants';

import CommandStore from '../stores/CommandStore';
import EnteredCommandStore from '../stores/EnteredCommandStore';
import AutoCompleteStore from '../stores/AutoCompleteStore';

import AutoCompleteSuggestion from './AutoCompleteSuggestion';

let shell = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

let term = new TerminalJS({
  cols: 80,
  rows: 30,
  screenKeys: true
});

let Terminal = React.createClass({
  /** Styles */
  mainStyle() {
    return {
      fontFamily: 'monospace'
    };
  },

  _suggestionListStyle() {
    if (!term.element) {
      return;
    }

    var numSuggestions = this.state.suggestions.length;
    var rowHeight = term.element.clientHeight / term.rows;
    var shouldRenderAbove = term.y + numSuggestions >= term.rows;

    var currentRowY = term.y * rowHeight;
    var suggestionListHeight = numSuggestions * rowHeight;
    var suggestionListStartY = shouldRenderAbove ? currentRowY - rowHeight - suggestionListHeight : currentRowY + rowHeight ;

    return {
      position: 'absolute',
      listStyleType: 'none',
      left: 0,
      top: suggestionListStartY,
      height: suggestionListHeight
    };
  },

  getState() {
    return {
      commands: CommandStore.getAll(),
      suggestions: AutoCompleteStore.getSuggestions(),
      selectedIndex: AutoCompleteStore.getSelectionIndex(),
      enteredCommand: EnteredCommandStore.get(),
      autoCompletedText: AutoCompleteStore.getAutoCompletedText(),

      // TODO: The view should not be handling logic for ignoring keys that we don't want to write to the shell.
      // Break interaction with the shell out into a store so we can make this cleaner.
      ignoredKeys: AutoCompleteStore.getKeyboardKeysToIgnore()
    };
  },

  /** Component Functions */

  getInitialState() {
    return this.getState();
  },

  componentDidMount() {
    let self = this;

    // send any output from the shell to the client
    shell.on('data', data => {
      term.write(data);
      TerminalActions.receiveOutput(data);
    });

    // write any input from the client to the shell
    term.on('data', data => {
      if (self.state.selectedIndex >= 0 && data === TerminalConstants.Keys.Enter) {
        // User has chosen a suggestion
        // save properties before clearing the buffer mutates their values
        var autoCompletedText = self.state.autoCompletedText;
        var bufferLength = self.state.enteredCommand.length;

        // clear the user's currently entered text (buffer)
        for (let i = 0; i < bufferLength; i++) {
          this.writeKey(TerminalConstants.Keys.Backspace);
        }

        // Write the suggested command
        this.writeText(autoCompletedText);
      } else {
        self.writeKey(data);
      }
    });

    term.open(self.getDOMNode());

    CommandStore.addChangeListener(self._onChange);
    AutoCompleteStore.addChangeListener(self._onChange);
  },

  componentWillUnmount() {
    CommandStore.removeChangeListener(this._onChange);
    AutoCompleteStore.removeChangeListener(this._onChange);
  },

  /**
   * Write the given key to the host shell,
   *
   * @param key
   */
  writeKey(key) {
    if (this.state.ignoredKeys.indexOf(key) === -1) {
      shell.write(key);
    }

    TerminalActions.typeKey(key);
  },

  writeText(text) {
    text.split('').forEach(char => this.writeKey(char));
  },

  render() {
    return (
      <div style={this._mainStyle()}>
        <div></div>

        <ul style={this._suggestionListStyle()}>
          {this.state.suggestions.map((suggestion, i) => {
            return <AutoCompleteSuggestion
              key={suggestion.id}
              isSelected={i === this.state.selectedIndex}
              onSelect={() => this.handleSelectSuggestion(i)}
              name={suggestion.name}
              description={suggestion.description} />;
          })}
        </ul>
      </div>
    );
  },

  handleSelectSuggestion(index) {
    selectSuggestion(index);
  },

  _onChange() {
    this.setState(this.getState());
  }
});

export default Terminal;
