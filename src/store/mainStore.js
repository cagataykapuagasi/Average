import { observable, action } from 'mobx';

let temp = [];

export default class mainStore {

    
    averageItem = {
        listName: undefined,
        listIndex: undefined,
    }
    
    @observable averageList = []; 

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action addAverage = () => {
        this.averageItem.listIndex = temp.length;
        temp.push(this.averageItem);
        this.averageList = temp;
    }

    @action deleteAverage = (index) => {
        console.log('silinmeden önce',this.averageList);
        temp.splice(index,1);
        this.averageList = temp;
        console.log('silinmeden sonra',this.averageList);

    }

}