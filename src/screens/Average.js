import React, { Component } from "react";
import {
  View,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { observer, inject } from "mobx-react";
import { LessonHidden, Lesson } from "../components";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dropdown } from "react-native-material-dropdown";
import { Actions } from "react-native-router-flux";
import { SwipeListView } from "react-native-swipe-list-view";
import { newLesson } from "../schema/lesson";

@inject("store")
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
        title = "İsimsiz";
      }
    } else {
      title = "Yeni Liste";
    }

    return {
      title
    };
  };

  state = {
    listName: "",
    lessonList: [],
    errors: []
  };

  componentDidMount() {
    this.loadLessons();
    this.refs.input.focus();
    //console.log(this.props.data);
  }

  finishEdit = () => {
    const { store, data } = this.props;
    const { listName, lessonList, errors } = this.state;
    const index = data ? data.index : null;
    const newData = { listName, lessonList, index };

    if (errors.length > 0) {
      errors.forEach(error => {
        alert(error.index + 1 + ". dersin kredisinde sadece rakam kullanınız.");
        console.log(
          error.index + 1 + ". dersin kredisinde sadece rakam kullanınız."
        );
      }); //demo
      return;
    }
    store.average.addNewList(newData);
  };

  createLessons = length => {
    this.setState({
      lessonList: []
    });

    for (let i = 0; i < length; i++) {
      this.setState(prevState => ({
        lessonList: [...prevState.lessonList, new newLesson()]
      }));
    }
  };

  loadLessons = () => {
    const { data } = this.props;

    if (!data) {
      return;
    }
    this.setState({
      listName: data.item.listName
    });
    data.item.lessonList.map(item => {
      this.setState(prevState => ({
        lessonList: [...prevState.lessonList, item]
      }));
    });
  };

  onChangeName = value => {
    this.setState({
      listName: value
    });
  };

  changeLessonNumber = length => {
    this.createLessons(length);
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
        errors: [...prevState.errors, _error]
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
    const { listName, lessonList } = this.state;
    const dropdownValues = [
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

    //console.log('state', this.state);

    return (
      <View style={styles.main}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "light-content" : "default"}
        />

        <View style={styles.header}>
          <View style={{ left: 20 }}>
            <TextInput
              value={listName}
              onChangeText={this.onChangeName}
              ref="input"
              placeholder="Liste Adı"
              placeholderTextColor="white"
              style={styles.rightHeader_1}
            />
            <View style={styles.rightHeader_2} />
          </View>
          <Dropdown
            label="Ders sayısı"
            data={dropdownValues}
            dropdownPosition={-5}
            textColor="white"
            itemColor="#c3c3c3"
            pickerStyle={{ backgroundColor: "#2d2d2d" }}
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
            keyExtractor={(item, index) => "key" + index}
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
    flexDirection: "row"
  },
  list: {
    flex: 12
  },
  mainText: {
    right: 0,
    fontSize: 16,
    left: 20,
    color: "white",
    fontWeight: "bold"
  },
  header_1: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    left: 10
  },
  rightHeader_1: {
    height: 35,
    width: 150,
    color: "white"
  },
  rightHeader_2: {
    height: 0.4,
    backgroundColor: "white"
  },
  dropdown: {
    height: 40,
    width: 120,
    justifyContent: "center",
    left: 80,
    bottom: 7
  },
  buttons: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
