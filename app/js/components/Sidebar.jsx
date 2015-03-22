'use strict';

import SidebarStore from '../stores/SidebarStore';
import React from 'react';

// import Entry from './Entry';

var Sidebar = React.createClass({
  getState() {
    return {
      isShowing: SidebarStore.isShowing
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

  render: function() {
    if (this.state.isShowing) {
      window.resizeTo(840, 520);
    } else {
      window.resizeTo(640, 520);
    }

    return (
      <div className="Sidebar" id='sidebar' style={{display: this.state.isShowing ? 'block' : 'none'}}>
        <form action =''>
          <input type="text" name="query" placeholder="Search"></input>
        </form>

        <!--<Entry command="ls">List directory contents</Entry>-->
        <!--<Entry command="pwd">Print the name of current/working directory</Entry>-->
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

/*var Entry = React.createClass({
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
});*/

export default Sidebar;
