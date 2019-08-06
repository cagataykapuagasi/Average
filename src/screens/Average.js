import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { LessonHidden, Lesson, SlidingDropDown } from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { newLesson } from '../schema/lesson';
import { colors } from 'res';

const { width } = Dimensions.get('window');

@inject('store')
@observer
export default class AverageScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let title;
    if (params.data) {
      const { listName } = params.data.item;

      if (listName) {
        title = listName;
      } else {
        title = 'İsimsiz';
      }
    } else {
      title = 'Yeni Liste';
    }

    return {
      title,
    };
  };

  state = {
    listName: '',
    lessonList: [],
    errors: [],
    selectedNumber: 0,
  };

  componentDidMount() {
    this.loadLessons();
    this.refs.input.focus();
  }

  finishEdit = () => {
    const { store, data } = this.props;
    const { listName, lessonList, errors } = this.state;
    const index = data ? data.index : null;
    const newData = { listName, lessonList, index };

    if (errors.length > 0) {
      errors.forEach(error => {
        alert(error.index + 1 + '. dersin kredisinde sadece rakam kullanınız.');
        console.log(
          error.index + 1 + '. dersin kredisinde sadece rakam kullanınız.'
        );
      }); //demo
      return;
    }
    store.average.addNewList(newData);
  };

  createLessons = length => {
    this.setState({
      lessonList: [],
    });

    for (let i = 0; i < length; i++) {
      this.setState(prevState => ({
        lessonList: [...prevState.lessonList, new newLesson()],
      }));
    }
  };

  loadLessons = () => {
    const { data } = this.props;

    if (!data) {
      return;
    }

    const {
      data: {
        item: { lessonList, listName },
      },
    } = this.props;

    this.setState({
      listName: listName,
      selectedNumber: lessonList.length,
    });
    lessonList.map(item => {
      this.setState(prevState => ({
        lessonList: [...prevState.lessonList, item],
      }));
    });
  };

  onChangeName = value => {
    this.setState({
      listName: value,
    });
  };

  changeLessonNumber = selectedNumber => {
    this.setState(
      {
        selectedNumber,
      },
      () => this.createLessons(selectedNumber)
    );
  };

  onChangeLesson = (value, type, index) => {
    this.setState(prevState => {
      const newList = [...prevState.lessonList];
      newList[index][type] = value;
      return { lessonList: newList };
    });

    // this.setState(prevState => ({
    // 	['lessonList'[index]]: { //error
    // 		...prevState.lessonList[index],
    // 		['lessonList'[index][type]]: value,
    // 	}
    // }));
  };

  catchError = (error, index) => {
    const _error = { error, index };

    if (error) {
      this.setState(prevState => ({
        errors: [...prevState.errors, _error],
      }));
    }
  };

  renderItem = data => {
    return (
      <Lesson
        catchError={this.catchError}
        onChangeLesson={this.onChangeLesson}
        data={data}
      />
    );
  };

  renderHiddenItem = data => {
    return <LessonHidden lessons={true} data={data} />;
  };

  render() {
    const { listName, lessonList, selectedNumber } = this.state;

    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <TextInput
              value={listName}
              onChangeText={this.onChangeName}
              ref="input"
              placeholder="Liste Adı..."
              placeholderTextColor="white"
              style={styles.textInput}
            />
          </View>
          <View style={styles.rightHeader}>
            <SlidingDropDown
              changeLessonNumber={this.changeLessonNumber}
              selectedNumber={selectedNumber}
            />
          </View>
        </View>

        <SwipeListView
          useFlatList
          keyExtractor={(item, index) => 'key' + index}
          data={lessonList}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
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

          <TouchableOpacity onPress={this.finishEdit}>
            <Icon name="check" size={35} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  mainText: {
    right: 0,
    fontSize: 16,
    left: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    color: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    width: '90%',
    height: 49,
  },
  leftHeader: {
    flex: 1,
  },
  rightHeader: {
    flex: 1,
    alignItems: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
