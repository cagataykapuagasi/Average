import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { LessonHidden, TermCard } from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Actions } from 'react-native-router-flux';

@inject('store')
@observer
class MainScreen extends Component {
  newList = () => {
    const { colors } = this.props;

    Actions.average({ colors });
  };

  renderItem = item => {
    const { colors } = this.props;

    return <TermCard colors={colors} data={item} />;
  };

  renderHiddenItem = item => {
    return <LessonHidden toggleDelete={this.toggleDelete} item={item} />;
  };

  toggleDelete = index => {
    const { average } = this.props.store;

    average.deleteList(index);
  };

  render() {
    const { average, app } = this.props.store;
    const { colors } = this.props;
    const styles = _styles(colors);

    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.mainText}>Listem</Text>
          <View style={styles.rightHeader}>
            {!average.termList.length > 0 && app.showTips && (
              <Text style={styles.text}>Ders ekle -></Text>
            )}
            <TouchableOpacity onPress={this.newList}>
              <Icon
                name="add"
                style={styles.icon}
                size={35}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
        <SwipeListView
          useFlatList
          keyExtractor={(item, index) => 'key' + index}
          data={average.termList}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
          rightOpenValue={-55}
          disableRightSwipe
          previewDuration={500}
          previewOpenValue={-55}
          previewRowKey={app.showTips ? 'key0' : null}
        />
      </SafeAreaView>
    );
  }
}

export default MainScreen;

const _styles = colors =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    rightHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    mainText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
    },
    text: {
      color: colors.tipsText,
      right: 20,
    },
    icon: {
      width: 30,
    },
  });
