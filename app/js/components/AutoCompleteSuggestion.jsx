'use strict';

import React from 'react';

export default React.createClass({
  _mainStyle() {
    return {
      "color": "red"
    };
  },

  render() {
    return (<li style={this._mainStyle()}>{this.props.data.name}</li>);
  }
});
