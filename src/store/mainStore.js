import { observable, action } from 'mobx';

export default class mainStore {

    @observable nane; 

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

}