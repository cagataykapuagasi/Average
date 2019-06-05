import { observable, action } from 'mobx';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

let isNew = true;

export default class mainStore {

    @observable averageList = [];

    @observable averages = [];

    @observable currentAverageItem = {
        listName: undefined,
        listTime: undefined,
        average: undefined,
        averages: [],
        index: undefined,
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action restoreCurrentAverageItem = () => {
        this.currentAverageItem = {
            listName: undefined,
            listTime: undefined,
            average: undefined,
            averages: [],
            index: undefined,
        }
        this.averages = [];
    }

    @action addAverages = (length) => {
        this.averages = [];
        const averageItem = {
            lessonName: undefined,
            letterGrade: 'AA',
            credit: 0,
        }

        for (let i = 0; i < length; i++) {
            this.averages.push(averageItem);
        }
    }

    @action addAverageList = () => {
        const averageListItem = {
            listName: this.currentAverageItem.listName,
            listTime: this.getTime(),
            average: this.calculateAverage(),
            averages: this.averages,
        }

        if (isNew) {
            this.averageList.push(averageListItem);
        } else {
            this.averageList[this.currentAverageItem.index] = averageListItem;
        }
        isNew = true;
        Actions.main();
    }

    @action deleteAverageList = (index) => {
        this.averageList.splice(index, 1);
    }

    @action deleteAverages = (index) => {
        this.averages.splice(index, 1);
        this.averages = this.averages.map(i => {
            return i;
        });
    }

    calculateAverage = () => {
        let average = 0;
        let totalCredit = 0;
        this.averages.map( item => {
            let gradeNumber = this.returnGradeNumber(item.letterGrade);
            average += parseInt(item.credit) * gradeNumber;
            totalCredit += parseInt(item.credit);
        })
        average = average / totalCredit;
        
        return average;
    }

    returnGradeNumber = (value) => {
        if (value === 'AA')
            return 4.0;
        else if (value === 'BA')
            return 3.5;
        else if (value === 'BB')
            return 3.0;
        else if (value === 'CB')
            return 2.5;
        else if (value === 'CC')
            return 2.0;
        else if (value === 'DC')
            return 1.5;
        else if (value === 'DD')
            return 1.0;
        else if (value === 'FD')
            return 0.5;
        else if (value === 'FF')
            return 0;
    }

    fillCurrentData = (index) => {
        //this.currentAverageItem.listTime = this.averageList[index].listTime;
        //this.currentAverageItem.averages = this.averageList[index].averages;
        //this.currentAverageItem.average = this.averageList[index].average;
        //this.currentAverageItem.listName = this.averageList[index].listName;
        //this.currentAverageItem.index = index;
        this.currentAverageItem = this.averageList[index];
        this.averages = this.averageList[index].averages;
        isNew = false;
    }

    getTime = () => {
        const time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
        const day = time.getDate();
        const month = time.getMonth() + 1;
        const year = time.getFullYear();

        return hours + ':' + minutes + ' ' + day + '/' + month + '/' + year;
    }

    



}