import { observable, action } from 'mobx';

export default class curveStore {

    @observable grade;

    @observable average;

    @observable sD;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action getGrade = (value) => {
        this.grade = value;
    }

    @action getAverage = (value) => {
        this.average = value;
    }

    @action getSD = (value) => {
        this.sD = value;
    }





}

export const curve = new curveStore();