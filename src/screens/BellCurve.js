import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MyTextInput } from '../components';
import calculateBellCurve from '~/util/bellcurve';

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
          <Text>{bellCurve}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  part: {
    height: '12%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3d3d3d',
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
    color: '#c3c3c3',
    fontSize: 12,
  },
  text2: {
    color: '#fff',
    fontSize: 12,
  },
  sdButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    flexDirection: 'row',
  },
});
