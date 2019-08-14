import React, { Component } from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class SettingsScreen extends Component {
  SwitchMenu = ({ menuText, value, onValueChange }) => {
    const styles = _styles(this.props.colors);

    return (
      <View style={styles.menu}>
        <Text style={styles.menuText}>{menuText}</Text>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
    );
  };

  toggleTipsSwitch = value => {
    const { app } = this.props.store;

    app.setShowTips(value);
  };

  test = value => {
    const { app } = this.props.store;

    app.changeTheme(value);
  };

  render() {
    const styles = _styles(this.props.colors);
    const { app } = this.props.store;
    const { SwitchMenu } = this;

    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Icon name="cogs" size={30} color="#900" />
        </View>
        <View style={styles.part}>
          <SwitchMenu menuText="Uygulamayı değerlendir" />
          <SwitchMenu
            menuText="İpuçlarını göster"
            value={app.showTips}
            onValueChange={this.toggleTipsSwitch}
          />
          <SwitchMenu
            menuText="Karanlık mod"
            value={app.darkMode}
            onValueChange={this.test}
          />
          <SwitchMenu menuText="Bildirimler" />
        </View>
      </View>
    );
  }
}

export default SettingsScreen;

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     paddingHorizontal: 20,
//     //backgroundColor: colorss.colors.secondary,
//   },
//   header: {
//     flex: 1,
//   },
//   part: {
//     flex: 2,
//     justifyContent: 'center',
//   },
//   menu: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: colors.secondary,
//     padding: 8,
//   },
//   menuText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

const _styles = colors =>
  StyleSheet.create({
    main: {
      flex: 1,
      paddingHorizontal: 20,
    },
    header: {
      flex: 1,
    },
    part: {
      flex: 2,
      justifyContent: 'center',
    },
    menu: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.borderBottomColor,
      padding: 8,
    },
    menuText: {
      color: colors.text,
      fontSize: 16,
    },
  });
