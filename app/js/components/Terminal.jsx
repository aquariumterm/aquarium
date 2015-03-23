'use strict';

import React from 'react';
import TerminalJS from 'term.js';
import pty from 'pty.js';

import TerminalActions from '../actions/TerminalActions';
import SidebarActions from '../actions/SidebarActions';

import {selectSuggestion} from '../actions/AutoCompleteActions';

import AppConstants from '../constants/AppConstants';

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

  suggestionListStyle() {
    if (!term.element) {
      return null;
    }

    var numSuggestions = this.state.suggestions.length;
    var rowHeight = term.element.clientHeight / term.rows;
    var shouldRenderAbove = term.y + numSuggestions >= term.rows;

    var currentRowY = term.y * rowHeight;
    var suggestionListHeight = numSuggestions * rowHeight;
    var suggestionListStartY = shouldRenderAbove ? currentRowY - rowHeight - suggestionListHeight : currentRowY + rowHeight;

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
    // send any output from the shell to the client
    shell.on('data', data => {
      term.write(data);
      TerminalActions.receiveOutput(data);
    });

    // write any input from the client to the shell
    term.on('data', data => {

      if (data.charCodeAt(0) === 0) {
        SidebarActions.toggleSidebar();
      } else if (this.state.selectedIndex >= 0 && data === AppConstants.Keys.RightArrow) {

        // HACK: Update autocompletion by propogating the typed key. Will be replaced with
        // the select suggestion action from autocomplete actions.
        TerminalActions.typeKey(data);

        // User has chosen a suggestion
        // save properties before clearing the buffer mutates their values
        var autoCompletedText = this.state.autoCompletedText;
        var bufferLength = this.state.enteredCommand.length;

        // clear the user's currently entered text (buffer)
        for (let i = 0; i < bufferLength; i++) {
          this.writeKey(AppConstants.Keys.Backspace);
        }

        // Write the suggested command
        this.writeText(autoCompletedText);
      } else {
        this.writeKey(data);
      }
    });

    term.open(this.getDOMNode());

    CommandStore.addChangeListener(this.onChange);
    AutoCompleteStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    CommandStore.removeChangeListener(this.onChange);
    AutoCompleteStore.removeChangeListener(this.onChange);
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
      <div className="Terminal" style={this.mainStyle()}>
        <div></div>

        <ul style={this.suggestionListStyle()}>
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

  onChange() {
    this.setState(this.getState());
  }
});

export default Terminal;
