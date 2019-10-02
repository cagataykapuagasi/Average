import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from '../icon';

const { width } = Dimensions.get('window');

export default class Dropdown extends Component {
  constructor() {
    super();
    this.spring = new Animated.Value(1);
    this.scale = new Animated.Value(0);
    this.state = { hide: false };
  }

  toggleAnimation = () => {
    const { spring, scale } = this;

    Animated.spring(spring, {
      toValue: 0,
      friction: 20,
    }).start();

    setTimeout(() => {
      this.setState({
        hide: true,
      });

      Animated.spring(scale, {
        toValue: 1,
        friction: 25,
      }).start();
    }, 200);
  };

  onChangeText = value => {
    const { onChangeText } = this.props;
    const { spring, scale } = this;

    onChangeText(value);

    Animated.spring(scale, {
      toValue: 0,
      friction: 25,
    }).start();

    setTimeout(() => {
      this.setState({
        hide: false,
      });

      Animated.spring(spring, {
        toValue: 1,
        friction: 20,
      }).start();
    }, 200);
  };

  render() {
    const { value, data, colors } = this.props;
    const { hide } = this.state;

    return (
      <View style={styles.main}>
        {!hide && (
          <TouchableOpacity onPress={this.toggleAnimation}>
            <Animated.View
              style={[
                styles.buttonArea,
                { transform: [{ scale: this.spring }] },
              ]}>
              <Text style={styles.text}>{value}</Text>
              <Icon
                type="material-icons"
                name="play-arrow"
                size={20}
                color={'#fff'}
              />
            </Animated.View>
          </TouchableOpacity>
        )}
        {hide && (
          <Animated.View
            style={[styles.letterView, { transform: [{ scale: this.scale }] }]}>
            {data.map(item => {
              const color =
                item.value === value ? colors.dropdown : colors.text;

              return (
                <TouchableOpacity onPress={() => this.onChangeText(item.value)}>
                  <Text style={[styles.letterText, { color }]}>
                    {item.value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
  },
  buttonArea: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    right: 5,
  },
  letterView: {
    padding: 5,
    width: width - 40,
    flexDirection: 'row',
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    color: 'white',
    marginLeft: 10,
  },
  text: {
    color: 'white',
  },
});
