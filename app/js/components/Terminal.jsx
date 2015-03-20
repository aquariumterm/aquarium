'use strict';

import React from 'react';

import TerminalActions from '../actions/TerminalActions';
import {selectSuggestion} from '../actions/AutoCompleteActions';

import TerminalConstants from '../constants/TerminalConstants';

import TerminalStore from '../stores/TerminalStore';
import CommandStore from '../stores/CommandStore';
import EnteredCommandStore from '../stores/EnteredCommandStore';
import AutoCompleteStore from '../stores/AutoCompleteStore';

import AutoCompleteSuggestion from './AutoCompleteSuggestion';

let Terminal = React.createClass({
  /** Styles */
  mainStyle() {
    return {
      fontFamily: 'monospace'
    };
  },

  suggestionListStyle() {
    let term = TerminalStore.getTerminal();

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
      suggestions: AutoCompleteStore.getSuggestions(),
      selectedIndex: AutoCompleteStore.getSelectionIndex(),
      enteredCommand: EnteredCommandStore.get(),
      autoCompletedText: AutoCompleteStore.getAutoCompletedText()
    };
  },

  /** Component Functions */

  getInitialState() {
    return this.getState();
  },

  componentDidMount() {
    // Initialize the terminal on this DOM node
    let term = TerminalStore.getTerminal();
    term.open(this.getDOMNode());

    CommandStore.addChangeListener(this.onChange);
    AutoCompleteStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    CommandStore.removeChangeListener(this.onChange);
    AutoCompleteStore.removeChangeListener(this.onChange);
  },

  render() {
    return (
      <div style={this.mainStyle()}>
        <div></div>

        <ul style={this.suggestionListStyle()}>
          {this.state.suggestions.map((suggestion, i) => {
            return <AutoCompleteSuggestion
              key={suggestion.key}
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
