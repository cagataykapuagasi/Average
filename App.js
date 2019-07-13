import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router, Stack, Tabs } from 'react-native-router-flux';
import { Provider, observer } from 'mobx-react';
import rootStore from './src/store/rootStore';
import { MainScreen, BellCurveScreen, SettingsScreen, AverageScreen } from './src/screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from './assets';

class TabIcon extends Component {
	render() {
		const color = this.props.focused ? 'white' : 'gray';
		return <Icon name={this.props.iconName || 'user-o'} size={30} color={color} />;
	}
}

export default class App extends Component {
	render() {
		return (
			<Provider rootStore={rootStore}>
				<Router tabBarStyle={styles.tab} backButtonTextStyle={styles.backButtonStyle} backButtonTintColor={"white"} sceneStyle={styles.sceneStyle} titleStyle={styles.titleStyle} navigationBarStyle={styles.navigationBarStyle} wrapBy={observer}>
					<Tabs showLabel={false}>
						<Stack iconName="tasks" icon={TabIcon} key="root">
							<Scene initial component={MainScreen} hideNavBar key="main" />
							<Scene
								key="average"
								component={AverageScreen}
							/>
						</Stack>

						<Stack iconName="bell" icon={TabIcon} hideNavBar key="can">
							<Scene component={BellCurveScreen} />
						</Stack>

						<Stack iconName="cogs" icon={TabIcon} hideNavBar key="settings">
							<Scene component={SettingsScreen} />
						</Stack>
					</Tabs>
				</Router>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	tab: {
		backgroundColor: '#2d2d2d'
	},
  navigationBarStyle: {
    backgroundColor : colors.background,
    borderBottomWidth: 0,
  },
  titleStyle: {
    color: 'white',
  },
  sceneStyle: {
    backgroundColor: colors.background
  },
  backButtonStyle: {
    color: colors.text
  }
});
