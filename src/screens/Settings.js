import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';
import Rate, { AndroidMarket } from 'react-native-rate';

const options = {
  GooglePackageName: 'com.kapuagasi.cagatay.average',
  preferredAndroidMarket: AndroidMarket.Google,
  preferInApp: true,
};

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

  changeTheme = value => {
    const { app } = this.props.store;

    app.changeTheme(value);
  };

  rateApp = () => {
    const { app } = this.props.store;
    Rate.rate(options);
  };

  openSupport = () => {
    Linking.openURL('mailto:cagatay.kapuagasi@gmail.com');
  };

  render() {
    const { colors } = this.props;
    const styles = _styles(colors);
    const { showTips, darkMode } = this.props.store.app;
    const { SwitchMenu } = this;

    return (
      <View style={styles.main}>
        <View style={styles.part}>
          <TouchableOpacity onPress={this.rateApp} style={styles.button}>
            <Text style={styles.buttonText}>Bizi değerlendirin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.openSupport} style={styles.button}>
            <Text style={styles.buttonText}>
              Sorun, şikayet yada istek bildirin
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.part}>
          <SwitchMenu
            menuText="İpuçlarını göster"
            value={showTips}
            onValueChange={this.toggleTipsSwitch}
          />
          <SwitchMenu
            menuText="Karanlık mod"
            value={darkMode}
            onValueChange={this.changeTheme}
          />
        </View>
      </View>
    );
  }
}

export default SettingsScreen;

const _styles = colors =>
  StyleSheet.create({
    main: {
      flex: 1,
      paddingHorizontal: 20,
    },
    part: {
      paddingTop: 50,
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
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    button: {
      justifyContent: 'center',
      backgroundColor: colors.secondary,
      padding: 15,
      marginVertical: 10,
    },
  });
