import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';



class TabIcon extends Component {
  render() {
    const color = this.props.focused ? "white" : "gray"
    return (
      <Icon name={this.props.iconName || "user-o"} size={30} color={color} />
    )
  }
}

export default TabIcon;