import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { observer, inject } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

@inject('store')
@observer
export default class LessonHidden extends Component {
  forwardIndex = () => {
    const { props } = this;
    const { toggleDelete } = props;
    const { average } = props.store;
    const { index } = props.item;

    //console.log('hidden baba', listIndex);
    // if (!listIndex) {
    //   average.deleteList(index);
    //   return;
    // }
    // average.deleteLesson(listIndex, index);

    toggleDelete(index);
  };

  render() {
    const { text, color } = this.props;

    return (
      <View style={styles.main}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#6c0608', '#920b0d', '#ac0b0e']}
          style={styles.view}>
          <TouchableOpacity onPress={this.forwardIndex}>
            <Icon name="delete" size={25} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: 70,
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  view: {
    height: 70,
    width: '16%',
    backgroundColor: '#560405',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
});
