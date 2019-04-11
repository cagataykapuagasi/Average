import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import { observer, inject } from 'mobx-react';


@inject('rootStore')
@observer
export default class Average extends Component {

    onChangeText = (value,type) => {
        const { mainStore } = this.props.rootStore;
        const { data } = this.props;

        if (type === 'name') {
            mainStore.averages[data.index].lessonName = value;
        } else {
            mainStore.averages[data.index].credit = value;
        }
    }

    render() {
        const { data } = this.props;
        const { mainStore } = this.props.rootStore;
        const letterGrade = [{value:'AA'},{value:'BA'},{value:'BB'},{value:'CB'},{value:'CC'},{value:'DC'},{value:'DD'},{value:'FD'},{value:'FF'}];
        //console.log('average',data)
        return (
            <View onPress={Actions.average} style={styles.main} >
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    colors={['#1d1d1d', '#2d2d2d', '#3d3d3d']} style={styles.view}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <View style={{flex:1,alignItems:'flex-start',left:10}}>
                            <TextInput value={data.item.lessonName} onChangeText={(value) => this.onChangeText(value,'name')} placeholder="Ders Adı..." placeholderTextColor="white" style={styles.text}/>
                        </View>

                        <View style={{flex:1,alignItems:'flex-end'}}>
                            <Icon name="keyboard-arrow-left" size={25} color="red" />
                        </View>
                    </View>

                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <View style={{flex:2,alignItems:'flex-start',left:10}}>
                            <TextInput value={data.item.credit} onChangeText={(value) => this.onChangeText(value,'kredi')} keyboardType="decimal-pad" placeholder="Ders Kredisi..." placeholderTextColor="white" style={styles.text}/>
                        </View>

                        <View style={{flex:1,alignItems:'flex-end',right:5}}>
                            <Dropdown
                                value={data.item.letterGrade ? data.item.letterGrade : "AA"}
                                data={letterGrade}
                                dropdownPosition={-5}
                                textColor="white"
                                itemColor="#c3c3c3"
                                pickerStyle={{backgroundColor:'#2d2d2d'}}
                                baseColor='white'
                                containerStyle={{height:40,width:50,justifyContent:'center',bottom: 8}}
                                onChangeText={ (value) => {
                                    mainStore.averages[data.index].letterGrade = value;
                                }}
                            />
                        </View>
                    </View>
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
        borderWidth: 0.3,
        borderColor: 'gray',
        marginRight:2,
    },
    text: {
        color: 'white',
    },
    dateText: {
        color: '#c3c3c3',
    },

})