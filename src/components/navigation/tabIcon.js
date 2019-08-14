import React, { Component } from 'react';
import Icon from '../icon';

class TabIcon extends Component {
  render() {
    const {
      focusedIcon,
      unFocusedIcon,
      focused,
      iconType,
      iconSize,
      colors,
    } = this.props;
    const color = focused ? colors.tabFocused : colors.tabUnFocused;
    const icon = focused ? focusedIcon : unFocusedIcon;
    return (
      <Icon type={iconType} name={icon} size={iconSize || 30} color={color} />
    );
  }
}

export default TabIcon;
