import mainStore from './mainStore';

class rootStore { 

    constructor() {
        this.mainStore = new mainStore(this);
    }

}

export default new rootStore();



