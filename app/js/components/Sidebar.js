import React from 'react';

// import Entry from './Entry';

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="Sidebar" id='sidebar' display='none'>
      	<form action =''>
        	<input type="text" name="query" placeholder="Search"></input>
      	</form>

      	<Entry command="ls">List directory contents</Entry> 	
      	<Entry command="pwd">Print the name of current/working directory</Entry>
      </div>
    );
  }
});

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

export default Sidebar;
