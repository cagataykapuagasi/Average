import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { observer, inject } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

@inject('rootStore')
@observer
export default class Average extends Component {

    forwardIndex = () => {
        const { mainStore } = this.props.rootStore;
        const { props } = this;
        //console.log('averages',props.averages);
        if (!props.averages) {
            mainStore.deleteAverageList(props.data.index);
        } else {
            mainStore.deleteAverages(props.data.index);
        }
    }
 
    render() {
        const { text, color } = this.props;
        //console.log('props hidden',this.props);
        return (
            <View style={styles.main} >
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#6c0608', '#920b0d', '#ac0b0e']} style={styles.view}>
                    <TouchableOpacity onPress={this.forwardIndex} >
                            <Icon name="delete" size={25} color="white" /> 
                    </TouchableOpacity>
                </LinearGradient>                  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        height: 60,
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 12,
        marginBottom: 12,
    },
    view: {
        height: 60,
        width: '16%',
        backgroundColor: '#560405',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18
        
    },
})