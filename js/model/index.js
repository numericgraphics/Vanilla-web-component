export default class Model {
    constructor(urn){
        console.log("constructor model", urn);
        this.urn = urn;
        window.letterBoxWeb.getMediaCompositionByUrn('urn:rts:video:10255533').then((result) => {
            console.log("getMediaCompositionByUrn result", result);
        });
    }

    getUrn (){
        return this.urn;
    }
}
