import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Icon extends Component {
  render() {
    const { props } = this;
    const { type } = props;

    if (type === 'ionicons') {
      return <Ionicons {...props} />;
    } else if (type === 'foundation') {
      return <Foundation {...props} />;
    } else if (type === 'entypo') {
      return <Entypo {...props} />;
    } else if (type === 'fontawesome5') {
      return <FontAwesome5 {...props} />;
    } else if (type === 'fontawesome') {
      return <FontAwesome {...props} />;
    } else if (type === 'antdesign') {
      return <AntDesign {...props} />;
    } else if (type === 'feather') {
      return <Feather {...props} />;
    } else if (type === 'material-community-icons') {
      return <MaterialCommunity {...props} />;
    } else if (type === 'material-icons') {
      return <MaterialIcons {...props} />;
    } else {
      return <FontAwesome name="close" />;
    }
  }
}
