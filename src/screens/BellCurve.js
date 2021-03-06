import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MyTextInput } from '../components';
import calculateBellCurve from '~/util/bellcurve';
//import { colors } from 'res';

export default class BellCurveScreen extends Component {
  state = {
    courseGrade: '',
    average: '',
    sd: '',
    bellCurve: '',
  };

  onChangeText = (value, type) => {
    this.setState(
      {
        [type]: value,
      },
      this.calculateBellCurve(value, type)
    );
  };

  calculateBellCurve = (value, type) => {
    const sd = type === 'sd' ? value : null;
    const courseGrade = type === 'courseGrade' ? value : null;
    const average = type === 'average' ? value : null;
    const bellCurve = calculateBellCurve(sd, courseGrade, average);

    this.setState({
      bellCurve,
    });
  };

  render() {
    const { courseGrade, average, sd, bellCurve } = this.state;
    const textinput = [
      {
        value: courseGrade,
        onChangeText: value => this.onChangeText(value, 'courseGrade'),
        placeholder: 'Ders Notu...',
      },
      {
        value: average,
        onChangeText: value => this.onChangeText(value, 'average'),
        placeholder: 'Sınıf Ortalaması...',
      },
      {
        value: sd,
        onChangeText: value => this.onChangeText(value, 'sd'),
        placeholder: 'Standart Sapma...',
      },
    ];
    const { colors } = this.props;
    const styles = _styles(colors);
    return (
      <View style={styles.main}>
        <View style={styles.firstHeader}>
          {textinput.map((item, index) => {
            return (
              <View key={item.placeholder + index} style={styles.part}>
                <MyTextInput
                  onChangeText={item.onChangeText}
                  value={item.value}
                  placeholder={item.placeholder}
                  colors={colors}
                />
              </View>
            );
          })}
          <View style={styles.sdButton}>
            <Text style={styles.text}>
              Standart sapmayı bilmiyor musunuz ?
              <Text onPress={() => console.log('hello')} style={styles.text2}>
                {' '}
                tıklayın
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.secondHeader}>
          <Text style={styles.resultText}>
            {bellCurve ? bellCurve : 'Bilgilerini doldurunuz.'}
          </Text>
        </View>
      </View>
    );
  }
}

const _styles = colors =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
    part: {
      height: '12%',
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.secondary,
      borderRadius: 15,
      marginTop: 15,
    },
    firstHeader: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    secondHeader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.tipsText,
      fontSize: 12,
    },
    text2: {
      color: colors.text,
      fontSize: 12,
    },
    sdButton: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      top: 10,
      flexDirection: 'row',
    },
    resultText: {
      color: colors.text,
      borderWidth: 2,
      borderColor: colors.dropdown,
      padding: 15,
      borderRadius: 25,
      fontWeight: 'bold',
    },
  });
