import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class MyInputView extends Component {
  onChangeText = value => {
    const { onChangeText } = this.props;

    onChangeText(value);
  };

  render() {
    const { value, placeholder, colors } = this.props;
    const styles = _styles(colors);

    return (
      <TextInput
        value={value}
        onChangeText={this.onChangeText}
        keyboardType="decimal-pad"
        placeholder={placeholder}
        placeholderTextColor={colors.text}
        style={styles.text}
        maxLength={20}
      />
    );
  }
}

const _styles = colors =>
  StyleSheet.create({
    text: {
      color: colors.text,
      textAlign: 'center', //for android
    },
  });
