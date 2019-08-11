import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class MyInputView extends Component {
  onChangeText = value => {
    const { onChangeText } = this.props;

    onChangeText(value);
  };

  render() {
    const { value, placeholder } = this.props;

    return (
      <TextInput
        value={value}
        onChangeText={this.onChangeText}
        keyboardType="decimal-pad"
        placeholder={placeholder}
        placeholderTextColor="white"
        style={styles.text}
        maxLength={20}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});
