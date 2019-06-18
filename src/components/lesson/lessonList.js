import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';


@inject('rootStore')
@observer
export default class LessonList extends Component {

    goToAverageScreen = () => {
        const { averageStore } = this.props.rootStore;
        const { data } = this.props;

        averageStore.fillCurrentData(data.index);
        Actions.average();
    }


    render() {
        const { data } = this.props;
        const average = data.item.average ? parseFloat(Math.round(data.item.average * 100) / 100).toFixed(2) : '0.00';
        return (
            <TouchableOpacity onPress={this.goToAverageScreen} style={styles.main} >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#1d1d1d', 'gray', '#1d1d1d']} style={styles.view}>
                    <View style={styles.firstView}>
                        <View style={styles.firstView_1}>
                            <Text style={styles.text}>{data.item.listName}</Text>
                        </View>

                        <View style={styles.firstView_2}>
                            <Icon name="keyboard-arrow-left" size={25} color="red" />
                        </View>
                    </View>

                    <View style={styles.secondView}>
                        <View style={styles.secondView_1}>
                            <Text style={[styles.text, { fontWeight: 'normal' }]}>{average}</Text>
                        </View>

                        <View style={styles.secondView_2}>
                            <Text style={styles.dateText}>{data.item.listTime}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 12,
    },
    view: {
        height: 60,
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
        color: '#c3c3c3',
    },
    firstView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    firstView_1: {
        flex: 1,
        alignItems: 'flex-start',
        left: 10
    },
    firstView_2: {
        flex: 1,
        alignItems: 'flex-end'
    },
    secondView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    secondView_1: {
        flex: 1,
        alignItems: 'flex-start',
        left: 10
    },
    secondView_2: {
        flex: 1,
        alignItems: 'flex-end',
        right: 5
    }

})