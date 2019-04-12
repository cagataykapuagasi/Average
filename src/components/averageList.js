import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';


@inject('rootStore')
@observer
export default class AverageList extends Component {

    goToAverageScreen = () => {
        const { mainStore } = this.props.rootStore;
        const { data } = this.props;
        //console.log('dwqhdjqwkdqw',data);

        mainStore.fillCurrentData(data.index);
        //mainStore.selectedAverageList = data.index;
        Actions.average();
    }


    render() {
        const { data } = this.props;
        console
        return (
            <TouchableOpacity onPress={this.goToAverageScreen} style={styles.main} >
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    colors={['#1d1d1d', 'gray', '#1d1d1d']} style={styles.view}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <View style={{flex:1,alignItems:'flex-start',left:10}}>
                            <Text style={styles.text}>{data.item.listName}</Text>
                        </View>

                        <View style={{flex:1,alignItems:'flex-end'}}>
                            <Icon name="keyboard-arrow-left" size={25} color="red" />
                        </View>
                    </View>

                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <View style={{flex:1,alignItems:'flex-start',left:10}}>
                            <Text style={[styles.text,{fontWeight:'normal'}]}>{data.item.average}</Text>
                        </View>

                        <View style={{flex:1,alignItems:'flex-end',right:5}}>
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
        marginTop: 7.5,
        marginBottom: 7.5,
    },
    view: {
        height: 50,
        width: '90%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.3,
        borderColor: 'gray',
        marginRight:2,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    dateText: {
        color: '#c3c3c3',
    },

})