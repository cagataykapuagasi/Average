import React, { Component } from 'react';
import { View, StatusBar, Platform, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
import { LessonHidden, AverageCard } from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Actions } from 'react-native-router-flux';

@inject('rootStore')
@observer
export default class MainScreen extends Component {

	goAverages = () => {
		Actions.average()
	}

	render() {
		const { averageStore } = this.props.rootStore;

		return (
			<View style={styles.main}>
				<StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'default'} />

				<View style={styles.header}>
					<View style={styles.main}>
						<Text style={styles.mainText}>Listem</Text>
					</View>

					<View style={styles.rightHeader}>
						{!averageStore.averageList.length > 0 && <Text style={styles.text}>Ders ekle -></Text>}
						<TouchableOpacity onPress={this.goAverages}>
							<Icon name="add" size={35} color="white" />
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.list}>
					<SwipeListView
						useFlatList
						keyExtractor={(item, index) => 'key' + index}
						data={averageStore.averageList}
						renderItem={data => <AverageCard data={data} />}
						renderHiddenItem={data => <LessonHidden data={data} />}
						rightOpenValue={-48}
						disableRightSwipe
						previewDuration={500}
						previewOpenValue={-48}
						previewRowKey="key0"
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	header: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row'
	},
	rightHeader: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingRight: 20
	},
	list: {
		flex: 4
	},
	mainText: {
		right: 0,
		fontSize: 16,
		left: 20,
		color: 'white',
		fontWeight: 'bold'
	},
	text: {
		color: '#d4d4d4',
		right: 20
	}
});
