import { observable, action } from "mobx";
import { Actions } from "react-native-router-flux";
import { ignore } from "mobx-sync";

let isNew = true;

export class averageStore {
  @observable termList = [];

  @action addNewList = data => {
    const { termList } = this;
    const { index } = data;
    const listTime = this.getTime();
    const average = this.calculateAverage(data.lessonList);
    const newTerm = {
      ...data,
      listTime,
      average
    };

    if (index !== null) {
      termList[index] = newTerm;
    } else {
      termList.push(newTerm);
    }
    Actions.main();
  };

  calculateAverage = lessonList => {
    let average = 0;
    let totalCredit = 0;
    lessonList.map(item => {
      let gradeNumber = this.returnGradeNumber(item.grade);
      average += parseInt(item.credit) * gradeNumber;
      totalCredit += parseInt(item.credit);
    });
    average = average / totalCredit;

    return average;
  };

  @action deleteAverageList = index => {
    this.averageList.splice(index, 1);
  };

  @action deleteLesson = index => {
    this.lessons.splice(index, 1);
    this.lessons = this.lessons.map(i => {
      //force update
      return i;
    });
  };

  returnGradeNumber = value => {
    switch (value) {
      case "AA":
        return 4.0;
      case "BA":
        return 3.5;
      case "BB":
        return 3.0;
      case "CB":
        return 2.5;
      case "CC":
        return 2.0;
      case "DC":
        return 1.5;
      case "DD":
        return 1.0;
      case "FD":
        return 0.5;
      case "FF":
        return 0;
    }
  };

  getTime = () => {
    const time = new Date();
    const hours = time.getHours();
    const minutes =
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();

    return hours + ":" + minutes + " " + day + "/" + month + "/" + year;
  };
}

export const average = new averageStore();
