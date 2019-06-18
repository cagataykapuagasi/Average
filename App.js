import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router, Stack, Tabs } from 'react-native-router-flux';
import { Provider, observer } from 'mobx-react';
import rootStore from './src/store/rootStore';
import { 
  MainScreen,
  BellCurveScreen,
  SettingsScreen,
  AverageScreen,
} from './src/screens';
import Icon from 'react-native-vector-icons/FontAwesome';

class TabIcon extends Component {
  render() {
    const color = this.props.focused ? "white" : "gray"
    return (
      <Icon name={this.props.iconName || "user-o"} size={30} color={color} />
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider rootStore = {rootStore}>
        <Router wrapBy={observer}>

          <Tabs tabBarStyle={styles.tab} showLabel={false} >
            <Stack iconName="tasks" icon={TabIcon} hideNavBar key="mainroot">
              <Scene initial component={MainScreen} key="main" />
              <Scene onExit={ i => rootStore.averageStore.restoreCurrentAverageItem()} key="average" component={AverageScreen} />
            </Stack>

            <Stack iconName="bell" icon={TabIcon}  hideNavBar key="can">
              <Scene component={BellCurveScreen} />
            </Stack>

            <Stack iconName="cogs" icon={TabIcon}  hideNavBar key="settings">
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
    backgroundColor:'#2d2d2d',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
