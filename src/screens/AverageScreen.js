import React, { Component } from 'react';
import { View, StatusBar, Platform, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { observer, inject } from 'mobx-react';
import { LessonHidden, Lesson } from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';

@inject('rootStore')
@observer
export default class AverageScreen extends Component {

	static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.listName ?? "Yeni Liste"
  });

	componentDidMount() {
		this.refs.input.focus();
	}

	changeLessonNumber = value => {
		const { averageStore } = this.props.rootStore;

		averageStore.addLessons(value);
	};

	componentWillUnmount() {
		const { averageStore } = this.props.rootStore;

		averageStore.restoreCurrentAverageItem()
	}

	render() {
		const { averageStore } = this.props.rootStore;
		const data = [
			{ value: 1 },
			{ value: 2 },
			{ value: 3 },
			{ value: 4 },
			{ value: 5 },
			{ value: 6 },
			{ value: 7 },
			{ value: 8 },
			{ value: 9 },
			{ value: 10 }
		];

		return (
			<View style={styles.main}>
				<StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'default'} />

				<View style={styles.header}>
						<View style={{ left: 20 }}>
							<TextInput
								value={averageStore.currentAverageItem.listName}
								onChangeText={value => (averageStore.currentAverageItem.listName = value)}
								ref="input"
								placeholder="Liste Adı"
								placeholderTextColor="white"
								style={styles.rightHeader_1}
							/>
							<View style={styles.rightHeader_2} />
						</View>
						<Dropdown
							label="Ders sayısı"
							data={data}
							dropdownPosition={-5}
							textColor="white"
							itemColor="#c3c3c3"
							pickerStyle={{ backgroundColor: '#2d2d2d' }}
							baseColor="white"
							containerStyle={styles.dropdown}
							onChangeText={value => {
								this.changeLessonNumber(value);
							}}
						/>
				</View>

				<View style={styles.list}>
					<SwipeListView
						useFlatList
						keyExtractor={(item, index) => 'key' + index}
						data={averageStore.lessons}
						renderItem={data => <Lesson data={data} />}
						renderHiddenItem={data => <LessonHidden lessons={true} data={data} />}
						rightOpenValue={-55}
						disableRightSwipe
						previewDuration={500}
						previewOpenValue={-55}
						previewRowKey="key0"
					/>

					<View style={styles.buttons}>
						<TouchableOpacity onPress={Actions.pop}>
							<Icon name="close" size={35} color="red" />
						</TouchableOpacity>

						<TouchableOpacity onPress={averageStore.addAverageList}>
							<Icon name="check" size={35} color="green" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		paddingTop: 30
	},
	header: {
		flex: 1,
		flexDirection: 'row',
	},
	list: {
		flex: 6
	},
	mainText: {
		right: 0,
		fontSize: 16,
		left: 20,
		color: 'white',
		fontWeight: 'bold'
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
		height: '15%',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});
