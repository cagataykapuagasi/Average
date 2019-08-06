import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Item from './item';
import { letterList } from '~/util/dropdown';
import { colors } from 'res';

class SlidingDropDown extends Component {
  state = {
    spring: new Animated.Value(0),
    opacity: new Animated.Value(0),
  };

  toggleDropDown = () => {
    const { spring } = this.state;

    if (spring._value > 0) {
      this.toggleAnimation(0, 0);
      return;
    }

    this.toggleAnimation(10, 1);
  };

  toggleAnimation = (springValue, opacityValue) => {
    const { spring, opacity } = this.state;

    Animated.parallel([
      Animated.spring(spring, {
        toValue: springValue,
        duration: 500,
      }),
      Animated.timing(opacity, {
        toValue: opacityValue,
        duration: 200,
        easing: Easing.ease,
      }),
    ]).start(this.isFirst);
  };

  isFirst = () => {
    const { selectedNumber } = this.props;
    const { spring } = this.state;
    const { flatlist } = this.refs;

    if (spring._value > 0 && selectedNumber === 0) {
      flatlist.scrollToOffset({ animated: true, offset: 50 });
      setTimeout(() => {
        flatlist.scrollToOffset({ animated: true, offset: 0 });
      }, 500);
    }
  };

  renderItem = ({ item, index }) => {
    const { selectedNumber, changeLessonNumber } = this.props;

    return (
      <Item
        selectedNumber={selectedNumber}
        changeLessonNumber={changeLessonNumber}
        index={index}
        item={item}
      />
    );
  };

  render() {
    const { opacity, spring } = this.state;
    const { selectedNumber } = this.props;

    return (
      <>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>Ders Sayısı</Text>
          <TouchableOpacity onPress={this.toggleDropDown}>
            <Icon name="arrow-drop-down" size={35} color={colors.text} />
          </TouchableOpacity>
          {selectedNumber === 0 && (
            <Text style={styles.infoText}>{'<- Seç'}</Text>
          )}
        </View>
        <Animated.View style={[styles.slideDown, { top: spring, opacity }]}>
          <FlatList
            ref="flatlist"
            data={letterList}
            renderItem={this.renderItem}
            horizontal
            style={styles.flatlist}
            extraData={this.props.selectedNumber}
            keyExtractor={(item, index) => 'key' + index}
          />
        </Animated.View>
      </>
    );
  }
}

export default SlidingDropDown;

const styles = StyleSheet.create({
  dropdownContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.text,
    height: 49,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    color: colors.text,
  },
  slideDown: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  flatlist: {
    paddingBottom: 10,
  },
  infoText: {
    color: colors.text,
  },
});
