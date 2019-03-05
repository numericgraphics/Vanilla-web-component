export default class Model {
    constructor(urn, eventsManager){
        this.urn = urn;
        console.log("constructor model urn", this.urn);
        this.eventsManager = eventsManager;
        console.log("constructor model eventsManager", this.eventsManager);
        window.letterBoxWeb.getMediaCompositionByUrn('urn:rts:video:10255533').then((result) => {
            console.log("getMediaCompositionByUrn result", result);
        });
    }

    getUrn (){
        return this.urn;
    }
}
