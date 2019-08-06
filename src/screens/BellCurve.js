import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Button } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class BellCurveScreen extends Component {
  onChangeText = () => {};

  render() {
    const { curve } = this.props.store;

    return (
      <View style={styles.main}>
        <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'default'} />

        <View style={styles.firstHeader}>
          <View style={styles.part}>
            <TextInput
              value={curve.grade}
              onChangeText={value => curveStore.getGrade(value)}
              keyboardType="decimal-pad"
              placeholder="Ders Notu..."
              placeholderTextColor="white"
              style={styles.text}
            />
          </View>

          <View style={styles.part}>
            <TextInput
              value={curve.average}
              onChangeText={value => curve.getAverage(value)}
              keyboardType="decimal-pad"
              placeholder="Sınıf Ortalaması..."
              placeholderTextColor="white"
              style={styles.text}
            />
          </View>

          <View style={styles.part}>
            <TextInput
              value={curve.sD}
              onChangeText={value => curve.getSD(value)}
              keyboardType="decimal-pad"
              placeholder="Standart Sapma..."
              placeholderTextColor="white"
              style={styles.text}
            />
          </View>

          <View style={styles.sdButton}>
            <Text style={styles.text2}>
              Standart sapmayı bilmiyor musunuz ?
              <Text onPress={() => console.log('hello')} style={[styles.text2, { color: 'white' }]}>
                {' '}
                tıklayın
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />
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
  text: {
    color: 'white',
  },
  text2: {
    color: '#c3c3c3',
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