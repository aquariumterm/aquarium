'use strict';

import React from 'react';

import ColorConstants from '../constants/ColorConstants';

export default React.createClass({
  _mainStyle(suggestion) {
    let style = {
      width: "600px",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: ColorConstants.Mixed
    };

    if (suggestion.selected) {
      style.backgroundColor = ColorConstants.DarkerBlue;
    } else {
      style.backgroundColor = 'black';
    }

    return style;
  },

  _nameStyle() {
    return {
      color: ColorConstants.LightSand,
      marginLeft: "15px",
      float: "left"
    };
  },

  _descriptionStyle() {
    return {
      color: ColorConstants.DarkSand
    };
  },

  render() {
    return (<li style={this._mainStyle(this.props.data)}>
      <div>
        <div style={this._nameStyle()}>{this.props.data.name}:&nbsp;</div>
        <div style={this._descriptionStyle()}>{this.props.data.description}</div>
      </div>
    </li>);
  }
});
