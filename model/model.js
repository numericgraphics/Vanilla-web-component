import IntegrationLayer from "./integrationLayer";

export default class Model {

    constructor(urn){
        console.log("Model constructor", urn);
        this.integrationLayer = new IntegrationLayer(urn);
    }

    init(){
        console.log("Model init");
        this.initListeners();
    }

    initListeners() {

    }
}
