import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Scene, Router, Stack, Tabs } from 'react-native-router-flux';
import { Provider, observer } from 'mobx-react';
import { store } from './src/store';
import { Main, BellCurve, Settings, Average } from './src/screens';
import { colors } from 'res';
import { TabIcon } from './src/components';

@observer
export default class App extends Component {
  render() {
    const { colors, darkMode } = store.app;
    const styles = _styles(colors);
    const barStyle = darkMode ? 'light-content' : 'dark-content';

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle={barStyle} />
          <Router
            colors={store.app.colors}
            tabBarStyle={styles.tab}
            backButtonTextStyle={styles.backButtonStyle}
            sceneStyle={styles.sceneStyle}
            titleStyle={styles.titleStyle}
            navigationBarStyle={styles.navigationBarStyle}
            wrapBy={observer}>
            <Tabs showLabel={false}>
              <Stack
                iconName="th-large"
                focusedIcon="door-open"
                unFocusedIcon="door-closed"
                iconType="fontawesome5"
                iconSize={25}
                icon={TabIcon}
                key="root">
                <Scene initial component={Main} hideNavBar key="main" />
                <Scene key="average" component={Average} />
              </Stack>

              <Stack
                iconType="material-community-icons"
                unFocusedIcon="bell"
                focusedIcon="bell-ring"
                icon={TabIcon}
                hideNavBar
                key="can">
                <Scene component={BellCurve} />
              </Stack>

              <Stack
                unFocusedIcon="ios-cog"
                focusedIcon="md-cog"
                iconType="ionicons"
                icon={TabIcon}
                hideNavBar>
                <Scene key="settings" component={Settings} />
              </Stack>
            </Tabs>
          </Router>
        </View>
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   tab: {
//     backgroundColor: '#2d2d2d',
//   },
//   navigationBarStyle: {
//     backgroundColor: colors.background,
//     borderBottomWidth: 0,
//   },
//   titleStyle: {
//     color: 'white',
//   },
//   sceneStyle: {
//     backgroundColor: colors.background,
//   },
//   backButtonStyle: {
//     color: colors.text,
//   },
// });

const _styles = colors =>
  StyleSheet.create({
    tab: {
      backgroundColor: colors.tabBackgroundColor,
    },
    navigationBarStyle: {
      backgroundColor: colors.background,
      borderBottomWidth: 0,
      tintColor: 'red',
    },
    titleStyle: {
      color: colors.text,
    },
    sceneStyle: {
      backgroundColor: colors.background,
    },
    backButtonStyle: {
      color: colors.text,
    },
  });
