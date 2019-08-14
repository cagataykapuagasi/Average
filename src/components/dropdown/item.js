import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

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
    const styles = _styles(colors);

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[styles.item, { borderColor }]}>
        <Text style={{ color }}>{item.value}</Text>
      </TouchableOpacity>
    );
  }
}

const _styles = colors =>
  StyleSheet.create({
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
