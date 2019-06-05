import mainStore from './mainStore';
import curveStore from './curveStore';

class rootStore { 

    constructor() {
        this.mainStore = new mainStore(this);
        this.curveStore = new curveStore(this);
    }

}

export default new rootStore();



