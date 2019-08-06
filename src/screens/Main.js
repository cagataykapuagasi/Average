import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { LessonHidden, TermCard } from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Actions } from 'react-native-router-flux';

@inject('store')
@observer
export default class MainScreen extends Component {
  goAverages = () => {
    Actions.average();
  };

  renderItem = item => {
    return <TermCard data={item} />;
  };

  renderHiddenItem = item => {
    return <LessonHidden lessons={true} data={item} />;
  };

  render() {
    const { average } = this.props.store;

    return (
      <View style={styles.main}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'light-content' : 'default'}
        />

        <View style={styles.header}>
          <Text style={styles.mainText}>Listem</Text>

          <View style={styles.rightHeader}>
            {!average.termList.length > 0 && (
              <Text style={styles.text}>Ders ekle -></Text>
            )}
            <TouchableOpacity onPress={this.goAverages}>
              <Icon name="add" style={styles.icon} size={35} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <SwipeListView
          useFlatList
          keyExtractor={(item, index) => 'key' + index}
          data={average.termList}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
          rightOpenValue={-48}
          disableRightSwipe
          previewDuration={500}
          previewOpenValue={-48}
          previewRowKey="key0"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 30,
  },
  leftHeader: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    color: '#d4d4d4',
    right: 20,
  },
  icon: {
    width: 30,
  },
});
