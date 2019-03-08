import {Observable} from "../libs/observable.js";
import {DataproviderService} from '../../node_modules/srgletterbox-web/app/dataProvider/services/DataProviderService.js';

export  class IntegrationLayer extends Observable {

    constructor(urn){
        super();
        this.GetUrn(urn);
        this.dataproviderService = new DataproviderService();
    }

    GetUrn(urn){
        console.log("Intergration layer", DataproviderService());
        // TODO --> fix default import in the dataProviderService
        // this.dataproviderService.getMediaCompositionByUrn(urn).then((result) => {
        //     Object.assign(this, result);
        //     this.notify(this);
        // });
    }
}
