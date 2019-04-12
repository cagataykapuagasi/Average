import { observable, action } from 'mobx';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

let temp = [];

export default class mainStore {

    @observable averageList = [];

    @observable averages = [];

    @observable currentAverageItem = {
        listNames: undefined,
        listTimes: undefined,
        averages: undefined,
        averagess: [],
        indexs: undefined,
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action restoreCurrentAverageItem = () => {
        this.currentAverageItem = {
            listNames: undefined,
            listTimes: undefined,
            averages: undefined,
            averagess: [],
            indexs: undefined,
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
            listName: this.currentAverageItem.listNames,
            listTime: this.getTime(),
            average: this.calculateAverage(),
            averages: this.averages,
        }

        if (this.currentAverageItem.indexs === undefined) {
            this.averageList.push(averageListItem);
        } else {
            this.averageList[this.currentAverageItem.indexs] = averageListItem;
        }
        Actions.main();
    }

    @action deleteAverageList = (index) => {
        this.averageList.splice(index, 1);
    }

    @action deleteAverages = (index) => {
        let temp2 = this.averages.splice(index, 1);
        temp.push(temp2);
        this.averages = this.averages.map(i => {
            return i;
        });
    }

    calculateAverage = () => {
        let average = 0;
        let totalCredit = 0;
        console.log('averages',this.averages);
        this.averages.map( item => {
            let gradeNumber = this.returnGradeNumber(item.letterGrade);
            console.log('credit',item.credit,'gradenumber',gradeNumber);
            average += parseInt(item.credit) * gradeNumber;
            totalCredit += parseInt(item.credit);
        })
        console.log('average',average,'totalcredit',totalCredit);
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
        this.currentAverageItem.listTimes = this.averageList[index].listTime;
        this.currentAverageItem.averagess = this.averageList[index].averages;
        this.currentAverageItem.averages = this.averageList[index].average;
        this.currentAverageItem.listNames = this.averageList[index].listName;
        this.currentAverageItem.indexs = index;
        this.averages = this.averageList[index].averages;
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
        if (this.currentAverageItem.indexs !== undefined) {
            const { listNames, listTimes, averages } = this.currentAverageItem;
            const currentAverageItem = {
                listName: listNames,
                listTime: listTimes,
                average: averages,
                averages: this.averages,
            }
            if (JSON.stringify(this.averageList[this.currentAverageItem.indexs]) === JSON.stringify(currentAverageItem)) {
                Actions.main();
            } else {
                this.showAlert(true);
            }

        } else {
            this.showAlert();
        }
    }

    showAlert = (push) => {
        if (push) {
            Alert.alert(
                'Data will not save',
                'Are you sure?',
                [
                    { 
                        text: 'Yes', onPress: () => {
                        this.averageList[this.currentAverageItem.indexs].averages.push(temp);
                        Actions.main()
                    } },
                    {
                        text: 'No',
                        onPress: () => '',
                        style: 'cancel',
                    },
                ],
            );
        } else {
            Alert.alert(
                'Data will not save',
                'Are you sure?',
                [
                    { 
                        text: 'Yes', onPress: () => {
                        Actions.main()
                    } },
                    {
                        text: 'No',
                        onPress: () => '',
                        style: 'cancel',
                    },
                ],
            );
        }
    }



}