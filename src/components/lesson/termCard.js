import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

export default class TermCard extends Component {
  state = {
    isWarningDialog: false,
  };
  goAverages = () => {
    const { data, colors } = this.props;

    Actions.average({ data, colors });
  };

  showWarning = () => {
    this.setState({
      isWarningDialog: !this.state.isWarningDialog,
    });
  };

  render() {
    const { data, colors } = this.props;
    const { isWarningDialog } = this.state;
    const average = data.item.average
      ? parseFloat(Math.round(data.item.average * 100) / 100).toFixed(2)
      : '0.00';
    const listName =
      data.item.listName.length > 0 ? data.item.listName : 'İsimsiz';
    const color = average >= 2.0 ? '#198A52' : 'red';
    const styles = _styles(colors);

    return (
      <TouchableOpacity onPress={this.goAverages} style={styles.main}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors.gradientTermCard}
          style={styles.view}>
          <View style={styles.firstView}>
            <View style={styles.firstView_1}>
              <Text style={styles.text}>{listName}</Text>
            </View>

            <View style={styles.firstView_2}>
              <Icon
                name="keyboard-arrow-left"
                size={25}
                color={colors.lessonCardPicker}
              />
            </View>
          </View>

          <View style={styles.secondView}>
            <View style={styles.secondView_1}>
              <Text style={[styles.averageText, { color }]}>{average}</Text>
              {color === 'red' && (
                <TouchableOpacity onPress={this.showWarning}>
                  <Icon
                    name="error-outline"
                    style={styles.errorIcon}
                    size={20}
                    color={colors.error}
                  />
                </TouchableOpacity>
              )}
              {isWarningDialog && (
                <View style={styles.warningView}>
                  <Text style={styles.warningText}>
                    Kredisi girilmemiş ders mevcut!
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.secondView_2}>
              <Text style={styles.dateText}>{data.item.listTime}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
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
      fontWeight: 'bold',
    },
    dateText: {
      color: colors.dateText,
    },
    firstView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    firstView_1: {
      flex: 1,
      alignItems: 'flex-start',
      left: 10,
    },
    firstView_2: {
      flex: 1,
      alignItems: 'flex-end',
    },
    secondView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    secondView_1: {
      flex: 1,
      alignItems: 'center',
      left: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    secondView_2: {
      flex: 1,
      alignItems: 'flex-end',
      right: 5,
    },
    averageText: {
      fontWeight: 'bold',
    },
    errorIcon: {
      left: 5,
    },
    warningView: {
      backgroundColor: 'orange',
      position: 'absolute',
      bottom: '50%',
      left: '30%',
      borderRadius: 17.5,
      borderBottomLeftRadius: 0,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    warningText: {
      color: '#fff',
    },
  });
