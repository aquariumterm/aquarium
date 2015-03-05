import React from 'react';

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="Sidebar">
      	<form action =''>
        	<input type="text" name="query" placeholder="Search"></input>
      	</form>
      </div>
    );
  }
});

export default Sidebar;
