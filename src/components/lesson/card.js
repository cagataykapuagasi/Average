import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
//import { Dropdown } from 'react-native-material-dropdown';
import { letterGrade } from '~/util/grades';
import Dropdown from './dropdown';

export default class Lesson extends Component {
  componentDidMount() {
    this.onBlurCredit();
  }

  state = {
    showError: false,
    creditColor: 'white',
  };

  onChangeText = (value, type) => {
    const { index } = this.props.data;

    this.props.onChangeLesson(value, type, index);
  };

  onBlurCredit = () => {
    const { credit } = this.props.data.item;
    const { index } = this.props.data;
    const { colors } = this.props;

    if (credit && !credit.match(/^-{0,1}\d+$/)) {
      this.setState({
        showError: true,
        creditColor: colors.errorText,
      });
      this.props.catchError(true, index);
    } else {
      this.setState({
        showError: false,
        creditColor: '#fff',
      });
      this.props.catchError(false, index);
    }
  };

  render() {
    const { name, credit, grade } = this.props.data.item;
    const { showError, creditColor } = this.state;
    const { colors } = this.props;
    const styles = _styles(colors);

    return (
      <View onPress={Actions.average} style={styles.main}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors.gradientLessonCard}
          style={styles.view}>
          <View style={styles.firstBlock}>
            <View style={styles.firstBlock_1}>
              <TextInput
                value={name}
                onChangeText={value => this.onChangeText(value, 'name')}
                placeholder="Ders Adı..."
                placeholderTextColor="white"
                style={styles.text}
              />
            </View>

            <View style={styles.firstBlock_2}>
              <Icon
                name="keyboard-arrow-left"
                size={25}
                color={colors.lessonCardPicker}
              />
            </View>
          </View>

          <View style={styles.secondBlock}>
            <View style={styles.secondBlock_1}>
              <TextInput
                value={credit}
                onChangeText={value => this.onChangeText(value, 'credit')}
                keyboardType="decimal-pad"
                placeholder="Ders Kredisi..."
                placeholderTextColor="white"
                onBlur={this.onBlurCredit}
                style={[styles.text, { color: creditColor }]}
                maxLength={2}
              />
              {showError && (
                <Icon
                  name="error-outline"
                  style={styles.errorIcon}
                  size={20}
                  color={colors.error}
                />
              )}
            </View>

            <View style={styles.secondBlock_2}>
              <Dropdown
                value={grade}
                data={letterGrade}
                onChangeText={value => this.onChangeText(value, 'grade')}
                colors={colors}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const _styles = colors =>
  StyleSheet.create({
    main: {
      height: 70,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },
    view: {
      height: 70,
      width: '90%',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.3,
      borderColor: 'gray',
      marginRight: 2,
    },
    text: {
      color: 'white',
      maxWidth: 120,
    },
    firstBlock: {
      flex: 1,
      flexDirection: 'row',
    },
    firstBlock_1: {
      flex: 1,
      alignItems: 'flex-start',
      left: 10,
      justifyContent: 'center',
    },
    firstBlock_2: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    secondBlock: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    secondBlock_1: {
      flex: 1,
      alignItems: 'center',
      left: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    secondBlock_2: {},
    dropdown: {
      height: 40,
      width: 50,
      justifyContent: 'center',
      bottom: 8,
    },
    errorIcon: {
      left: 5,
    },
    pickerStyle: {
      backgroundColor: colors.pickerBackground,
    },
  });
