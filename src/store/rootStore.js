import averageStore from './averageStore';
import curveStore from './curveStore';

class rootStore { 

    constructor() {
        this.averageStore = new averageStore(this);
        this.curveStore = new curveStore(this);
    }

}

export default new rootStore();



