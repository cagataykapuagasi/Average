import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { observer, inject } from 'mobx-react';
import { LessonHidden, Lesson, SlidingDropDown, Button } from '../components';
import { SwipeListView } from 'react-native-swipe-list-view';
import { calculateTitle, createLessons, handleErrorText } from '~/util';

@inject('store')
@observer
class AverageScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const title = calculateTitle(params);

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
    const newData = {
      listName: listName ? listName : 'İsimsiz',
      lessonList,
      index,
    };

    const filteredErrors = errors.filter(item => item !== null);

    if (filteredErrors.length > 0) {
      alert(handleErrorText(errors));
      return;
    }
    store.average.addNewList(newData);
  };

  createLessons = length => {
    const lessonList = createLessons(length, this.state.lessonList);

    this.setState({
      lessonList,
    });
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
      listName,
      selectedNumber: lessonList.length,
      lessonList,
    });
  };

  onChangeName = listName => {
    this.setState({
      listName,
    });
  };

  changeLessonNumber = selectedNumber => {
    if (selectedNumber === this.state.lessonList.length) {
      return;
    }

    this.setState({
      selectedNumber,
    });
    this.createLessons(selectedNumber);
  };

  onChangeLesson = (value, type, index) => {
    let lessonList = this.state.lessonList;
    lessonList[index][type] = value;

    this.setState({
      lessonList,
    });
  };

  catchError = (error, index) => {
    const _error = { error, index };
    const { errors } = this.state;

    if (error) {
      let newList = errors;
      newList[index] = _error;
      this.setState({
        errors: newList,
      });
      return;
    }

    if (errors.length === 1) {
      this.setState({
        errors: [],
      });
      return;
    }

    let newList = errors;
    newList.splice(index, 1);
    this.setState({
      errors: newList,
    });
  };

  toggleDelete = index => {
    const { lessonList } = this.state;
    let newList = lessonList;
    newList.splice(index, 1);
    this.setState({
      lessonList: newList,
    });
  };

  renderItem = data => {
    const { colors } = this.props;

    return (
      <Lesson
        catchError={this.catchError}
        onChangeLesson={this.onChangeLesson}
        data={data}
        colors={colors}
      />
    );
  };

  renderHiddenItem = item => {
    return <LessonHidden toggleDelete={this.toggleDelete} item={item} />;
  };

  render() {
    const { listName, lessonList, selectedNumber } = this.state;
    const { showTips } = this.props.store.app;
    const { data, colors } = this.props;
    const styles = _styles(colors);

    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <TextInput
              value={listName}
              onChangeText={this.onChangeName}
              ref="input"
              placeholder="Liste Adı..."
              placeholderTextColor={colors.text}
              style={styles.textInput}
            />
          </View>
          <View style={styles.rightHeader}>
            <SlidingDropDown
              changeLessonNumber={this.changeLessonNumber}
              selectedNumber={selectedNumber}
              colors={colors}
              showTips={showTips}
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
          previewRowKey={showTips ? 'key0' : null}
          style={styles.swipeList}
        />

        <View style={styles.buttons}>
          <Button onPress={this.finishEdit} text="Kaydet" colors={colors} />
        </View>
      </View>
    );
  }
}

export default AverageScreen;

const _styles = colors =>
  StyleSheet.create({
    main: {
      flex: 1,
      paddingTop: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingBottom: 10,
      backgroundColor: colors.background,
    },
    textInput: {
      color: colors.text,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.text,
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
      paddingVertical: 10,
      backgroundColor: colors.background,
    },
    swipeList: {
      flex: 1,
      backgroundColor: colors.background,
      zIndex: -1,
    },
  });
