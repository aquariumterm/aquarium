import React from 'react';

export default React.createClass({
  render() {
    return <li>{this.props.data.name}<li>;
  }
});