import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from 'res';

export default class Item extends Component {
  onPress = () => {
    const { changeLessonNumber, index } = this.props;

    changeLessonNumber(index);
  };

  render() {
    const { item, index, selectedNumber } = this.props;
    const borderColor =
      selectedNumber === index ? colors.secondary : colors.text;
    const color = selectedNumber === index ? colors.secondary : colors.text;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[styles.item, { borderColor }]}>
        <Text style={{ color }}>{item.value}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});
