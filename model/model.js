function initListeners() {

}

export default class Model {

    constructor(urn){
        console.log("Model constructor", urn);
    }

    init(){
        console.log("Model init");
        this.initListeners();
    }

    initListeners() {

    }
}
