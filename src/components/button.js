import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Button extends Component {
    render() {
        const { text, color } = this.props;
        return (
            <TouchableOpacity style={styles.button} >
                <Text style={styles.text}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: '50%',
        backgroundColor: '#a4a4a4',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    }
})