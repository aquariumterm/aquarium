'use strict';

import SidebarStore from '../stores/SidebarStore';
import SidebarActions from '../actions/SidebarActions';

import React from 'react';

export var EntryExample = React.createClass({
  propTypes: {
    code: React.PropTypes.string,
    description: React.PropTypes.string
  },

  render() {
    return (
      <div>
        <code>{this.props.code}</code>
        <p>{this.props.description}</p>
      </div>
    );
  }
});

export var Entry = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    examples: React.PropTypes.arrayOf(React.PropTypes.shape({
      code: React.PropTypes.string,
      description: React.PropTypes.string
    }))
  },

  render() {
    return (
      <div className="Entry">
        <h2 className="entryCommand">{this.props.name}</h2>
        <p>{this.props.description}</p>
        <div>
          {this.props.examples.map((e, i) =>
            <EntryExample key={i} code={e.code} description={e.description} />
          )}
        </div>
      </div>
    );
  }
});
let Sidebar = React.createClass({
  /** Styles */
  getStyle() {
    return {
      flex: '1',
      display: this.state.isShowing ? 'block' : 'none',
      fontFamily: 'monospace',
      float: 'left'
    };
  },

  getState() {
    return {
      isShowing: SidebarStore.isShowing,
      searchResults: SidebarStore.getSearchResults()
    };
  },

  getInitialState() {
    return this.getState();
  },

  componentDidMount() {
    SidebarStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    SidebarStore.removeChangeListener(this.onChange);
  },

  onChange() {
    this.setState(this.getState());
  },

  searchForEnteredText(e) {
    let query = e.target.value;
    SidebarActions.searchDocumentation(query);
  },

  render: function() {
    return (
      <div style={this.getStyle()}>
        <input type="text" ref="query" name="query" placeholder="Search" onChange={this.searchForEnteredText}></input>
        {this.state.searchResults.map((entry, i) =>
            <Entry key={i} name={entry.name} description={entry.description} examples={entry.examples} />
        )}
      </div>
    );
  }
});

export default Sidebar;
