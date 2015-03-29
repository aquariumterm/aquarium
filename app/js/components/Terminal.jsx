'use strict';

import React from 'react';

import TerminalActions from '../actions/TerminalActions';
import SidebarActions from '../actions/SidebarActions';

import AutoCompleteActions from '../actions/AutoCompleteActions';

import AppConstants from '../constants/AppConstants';

import TerminalStore from '../stores/TerminalStore';
import CommandStore from '../stores/CommandStore';
import AutoCompleteStore from '../stores/AutoCompleteStore';

import AutoCompleteSuggestion from './AutoCompleteSuggestion';

let Terminal = React.createClass({
  /** Styles */
  mainStyle() {
    return {
      fontFamily: 'monospace',
      float: 'left'
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
      selectedIndex: AutoCompleteStore.getSelectedIndex()
    };
  },

  /** Component Functions */

  getInitialState() {
    return this.getState();
  },

  componentDidMount() {
    // Initialize the terminal on this DOM node
    let term = TerminalStore.getTerminal();
    let domNode = this.getDOMNode();
    term.open(domNode);

    // Signal that the terminal is attached
    TerminalActions.attachTerminal(domNode.offsetWidth, domNode.offsetHeight);

    // Trigger the `typeKey` action when keys are pressed
    term.on('data', data => this.consumeKey(data));

    AutoCompleteStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    AutoCompleteStore.removeChangeListener(this.onChange);
  },

  render() {
    return (
      <div className="Terminal" style={this.mainStyle()}>
        <style>{`
          /* Use inline CSS to ensure <ul> elements have zero margin by default */
          .Terminal ul {
          margin: 0
          }
        `}</style>
        <div></div>

        <ul style={this.suggestionListStyle()}>
          {this.state.suggestions.map((suggestion, i) => {
            return <AutoCompleteSuggestion
              key={suggestion.key}
              isSelected={i === this.state.selectedIndex}
              name={suggestion.name}
              description={suggestion.description} />;
          })}
        </ul>
      </div>
    );
  },

  onChange() {
    this.setState(this.getState());
  },

  consumeKey(key) {
    //noinspection FallThroughInSwitchStatementJS
    switch (key) {
      case AppConstants.Keys.Enter:
        if (this.state.selectedIndex >= 0) {
          // Confirm the selected suggestion
          AutoCompleteActions.confirmSuggestion(this.state.selectedIndex);
          break;
        }
        // No suggestion selected; fall through
      case AppConstants.Keys.UpArrow:
        if (this.state.suggestions.length > 0) {
          AutoCompleteActions.selectPrev();
          break;
        }
        // No suggestions; fall through
      case AppConstants.Keys.DownArrow:
        if (this.state.suggestions.length > 0) {
          AutoCompleteActions.selectNext();
          break;
        }
        // No suggestions; fall through
      default:
        TerminalActions.typeKey(key);
        break;
    }
  }
});

export default Terminal;
