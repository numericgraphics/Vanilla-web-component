export default class IntegrationLayer {

    constructor(urn){
        console.log("IntegrationLayer constructor", urn);
        this.GetUrn(urn);
    }

    GetUrn(){
        window.letterBoxWeb.getMediaCompositionByUrn('urn:rts:video:10255533').then((result) => {
            Object.assign(this, result);
        });
    }

}
