'use strict';

import SidebarStore from '../stores/SidebarStore';
import SidebarActions from '../actions/SidebarActions';

import React from 'react';

// import Entry from './Entry';

var Entry = React.createClass({
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
    if (this.state.isShowing) {
      window.resizeTo(840, 520);
    } else {
      window.resizeTo(640, 520);
    }

    var entries = this.state.searchResults.map(function(searchResult) {
      return (<Entry command={searchResult.name}>{searchResult.description}</Entry>);
    });

    return (
      <div className="Sidebar" id='sidebar' style={{display: this.state.isShowing ? 'block' : 'none'}}>
        <form onSubmit={ this.searchForEnteredText }>
          <input id='sidebar-search-text' type="text" name="query" placeholder="Search"></input>
        </form>

        {entries}
      </div>
    );
  }
});

/*
var s = document.getElementById('sidebar');
        if(s.style.display === 'block'){
          s.style.display = 'none';
          window.resizeTo(640, 450);
        }
        else{
          s.style.display = 'block';
          window.resizeTo(840, 450);
        }
*/



export default Sidebar;
