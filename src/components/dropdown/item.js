import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

export default class Item extends Component {
  onPress = () => {
    const { changeLessonNumber, index } = this.props;

    changeLessonNumber(index);
  };

  render() {
    const { item, index, selectedNumber, colors } = this.props;
    const borderColor =
      selectedNumber === index ? colors.dropdown : colors.text;
    const color = selectedNumber === index ? colors.dropdown : colors.text;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[styles.item, { borderColor }]}>
        <Text style={{ color }}>{item.value}</Text>
        <View style={[styles.bottomView, { backgroundColor: borderColor }]} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  bottomView: {
    width: '50%',
    height: 3,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    top: 5,
  },
});
