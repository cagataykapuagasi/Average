import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Average extends Component {
    render() {
        const { text, color } = this.props;
        return (
            <View style={styles.main} >
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#1d1d1d', '#2d2d2d', '#3d3d3d']} style={styles.view}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        marginTop: 7.5,
        marginBottom: 7.5,
    },
    view: {
        height: 50,
        width: '90%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.1,
        borderColor: 'gray',
        marginRight:2,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    }
})