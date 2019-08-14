import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export default class Button extends Component {
  render() {
    const { text, onPress, colors } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={colors.gradientButton}
            style={styles.button}>
            <Text style={styles.text}>{text}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: width * 0.9,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
