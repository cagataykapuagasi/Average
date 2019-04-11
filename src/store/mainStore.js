import { observable, action } from 'mobx';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

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
            credit: undefined,
        }

        for (let i = 0; i < length; i++) {
            this.averages.push(averageItem);
        }
    }

    @action addAverageList = () => {
        const averageListItem = {
            listName: this.currentAverageItem.listName,
            listTime: this.getTime(),
            average: undefined,
            averages: this.averages,
        }

        if (this.currentAverageItem.index === undefined) {
            this.averageList.push(averageListItem);
        } else {
            this.averageList[this.selectedAverageList] = averageListItem;
        }
        Actions.main();
    }

    @action deleteAverageList = (index) => {
        this.averageList.splice(index,1);
    }

    @action deleteAverages = (index) => {
        this.averages.splice(index,1);
        this.averages = this.averages.map(i => {
            return i;
        });
        //this.averages.pop();
        //console.log('index',index)
        //console.log('this averages',this.averages);
        //console.log('this list',this.averageList);
        //this.averages.splice(index,1);
        //console.log('silindi mi ?',this.averages);
    }

    calculateAverage = () => {

    }

    fillCurrentData = (data,index) => {
        this.currentAverageItem = data;
        this.currentAverageItem.index = index;
        this.averages = data.averages;
        console.log('denme',this.currentAverageItem);
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

    @action changeDataControl = () => {
        console.log('control e girdi');
        if (this.currentAverageItem.index !== undefined) {
            //this.currentAverageItem.averages = this.averages;

            if (JSON.stringify(this.averageList[this.currentAverageItem.index]) === JSON.stringify(this.currentAverageItem) ) {
                Actions.main();
            } else {
                console.log('aynı deeeeel');
                Alert.alert("qwdwqd");
            }
        } else {
            Actions.main();
        }
    }



}