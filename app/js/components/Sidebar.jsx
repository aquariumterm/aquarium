'use strict';

import SidebarStore from '../stores/SidebarStore';
import SidebarActions from '../actions/SidebarActions';

import React from 'react';

// import Entry from './Entry';

export var Entry = React.createClass({
  render: function() {
    return (
      <div className="Entry">
        <hr></hr>
        <h2 className="entryCommand">
          {this.props.command}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var Sidebar = React.createClass({
  getStyle() {
    return {
      width: '200px',
      float: 'right',
      overflow: 'hidden',
      display: this.state.isShowing ? 'block' : 'none'
    };
  },

  getState() {
    return {
      isShowing: SidebarStore.isShowing,
      searchResults: SidebarStore.searchResults
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
    var sidebarSearch = document.getElementById('sidebar-search-text');
    SidebarActions.searchDocumentation(sidebarSearch.value);

    e.preventDefault();
  },

  render: function() {
    var entries = this.state.searchResults.map(searchResult => {
      return (
        <Entry command={searchResult.name}>{searchResult.description}</Entry>
      );
    });

    return (
      <div className="Sidebar" id='sidebar' style={this.getStyle()}>
        <form onSubmit={ this.searchForEnteredText }>
          <input id='sidebar-search-text' type="text" name="query" placeholder="Search"></input>
        </form>

        {entries}
      </div>
    );
  }
});

export default Sidebar;
