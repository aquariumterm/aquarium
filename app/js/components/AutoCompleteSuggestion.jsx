'use strict';

import React from 'react';

import ColorConstants from '../constants/ColorConstants';

export default React.createClass({
  mainStyle() {
    return {
      width: '400px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: ColorConstants.Mixed,
      backgroundColor: this.props.isSelected ? ColorConstants.DarkerBlue : 'black'
    };
  },

  nameStyle() {
    return {
      color: ColorConstants.LightSand,
      marginLeft: '15px',
      float: 'left'
    };
  },

  descriptionStyle() {
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
    return (<li style={this.mainStyle()}>
      <div>
        <div style={this.nameStyle()}>{this.props.name}:&nbsp;</div>
        <div style={this.descriptionStyle()}>{this.props.description}</div>
      </div>
    </li>);
  }
});
