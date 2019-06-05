import React, { Component } from 'react';
import { View, StatusBar, Platform, StyleSheet, TouchableOpacity, Text, FlatList, TextInput } from 'react-native';
import { observer, inject } from 'mobx-react';
import {
    AverageHidden,
    Average,
    Button,
    AverageList
} from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';

@inject('rootStore')
@observer
export default class AverageScreen extends Component {

    componentDidMount() {
        this.refs.input.focus();
    }

    changeLessonNumber = (value) => {
        const { mainStore } = this.props.rootStore;

        mainStore.addAverages(value);
    }

    render() {
        const { mainStore } = this.props.rootStore;
        const data = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }];
        return (
            <View style={styles.main}>
                <StatusBar barStyle={Platform.OS === 'ios' ? "light-content" : 'default'} />


                <View style={styles.header}>
                    <View style={styles.header_1}>
                        <TouchableOpacity onPress={Actions.pop}>
                            <Icon name="keyboard-arrow-left" size={35} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.mainText}>Ortalama Hesapla</Text>
                    </View>

                    <View style={styles.rightHeader}>
                        <View style={{ left: 20 }}>
                            <TextInput value={mainStore.currentAverageItem.listName} onChangeText={(value) => mainStore.currentAverageItem.listName = value}
                                ref="input" placeholder="Liste Adı" placeholderTextColor="white" style={styles.rightHeader_1} />
                            <View style={styles.rightHeader_2} />
                        </View>
                        <Dropdown
                            label="Ders sayısı"
                            data={data}
                            dropdownPosition={-5}
                            textColor="white"
                            itemColor="#c3c3c3"
                            pickerStyle={{ backgroundColor: '#2d2d2d' }}
                            baseColor='white'
                            containerStyle={styles.dropdown}
                            onChangeText={(value) => {
                                this.changeLessonNumber(value);
                            }}
                        />
                    </View>
                </View>

                <View style={styles.list}>
                    <SwipeListView
                        useFlatList
                        keyExtractor={(item, index) => 'key' + index}
                        data={mainStore.averages}
                        renderItem={(data) => (
                            <Average data={data} />
                        )}
                        renderHiddenItem={(data) => (
                            <AverageHidden averages={true} data={data} />
                        )}
                        rightOpenValue={-55}
                        disableRightSwipe
                        previewDuration={500}
                        previewOpenValue={-55}
                        previewRowKey="key0"
                    />

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={mainStore.changeDataControl} >
                            <Icon name="close" size={35} color="red" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={mainStore.addAverageList} >
                            <Icon name="check" size={35} color="green" />
                        </TouchableOpacity>
                    </View>

                </View>



            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#1d1d1d',
        paddingTop: 30,
    },
    header: {
        flex: 1,
    },
    rightHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        //backgroundColor:''
    },
    list: {
        flex: 4,
    },
    mainText: {
        right: 0,
        fontSize: 16,
        left: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    header_1: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        left: 10
    },
    rightHeader_1: {
        height: 35,
        width: 150,
        color: 'white'
    },
    rightHeader_2: {
        height: 0.4,
        backgroundColor: 'white'
    },
    dropdown: {
        height: 40,
        width: 120,
        justifyContent: 'center',
        left: 80,
        bottom: 7
    },
    buttons: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

})