import React, { Component } from 'react';
import { View, StatusBar, Platform, StyleSheet } from 'react-native';
import {
    Button,
} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MainScreen extends Component {
    render() {
        return (
            <View style={styles.main}>
                <StatusBar barStyle={Platform.OS === 'ios' ? "light-content" : 'default'} />

                <View style={styles.part}>
                    {/* <Button text="Ortalama Hesapla" /> */}
                    <Icon name="tasks" size={30} color="#900" />
                </View>

                <View style={styles.part}>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#1d1d1d'
    },
    part : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})