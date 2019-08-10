import React, { Component } from 'react';
import { colors } from 'res';
import Icon from '../icon';

class TabIcon extends Component {
  render() {
    const {
      focusedIcon,
      unFocusedIcon,
      focused,
      iconType,
      iconSize,
    } = this.props;
    const color = focused ? colors.text : colors.secondary;
    const icon = focused ? focusedIcon : unFocusedIcon;
    return (
      <Icon type={iconType} name={icon} size={iconSize || 30} color={color} />
    );
  }
}

export default TabIcon;
