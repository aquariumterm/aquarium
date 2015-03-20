'use strict';

import React from 'react';

import ColorConstants from '../constants/ColorConstants';

export default React.createClass({
  _mainStyle() {
    return {
      width: '600px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: ColorConstants.Mixed,
      backgroundColor: this.props.isSelected ? ColorConstants.DarkerBlue : 'black'
    };
  },

  _nameStyle() {
    return {
      color: ColorConstants.LightSand,
      marginLeft: '15px',
      float: 'left'
    };
  },

  _descriptionStyle() {
    return {
      color: ColorConstants.DarkSand
    };
  },

  propTypes: {
    isSelected: React.PropTypes.bool,
    name: React.PropTypes.string,
    description: React.PropTypes.string
  },

  render() {
    return (<li style={this._mainStyle()}>
      <div>
        <div style={this._nameStyle()}>{this.props.name}:&nbsp;</div>
        <div style={this._descriptionStyle()}>{this.props.description}</div>
      </div>
    </li>);
  }
});
