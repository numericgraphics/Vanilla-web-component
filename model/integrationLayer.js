import {Observable} from "../libs/observable.js";

export  class IntegrationLayer extends Observable {

    constructor(urn){
        super();
        this.GetUrn(urn);
    }

    GetUrn(){
        window.letterBoxWeb.getMediaCompositionByUrn('urn:rts:video:10255533').then((result) => {
            Object.assign(this, result);
            this.notify(this);
        });
    }
}
