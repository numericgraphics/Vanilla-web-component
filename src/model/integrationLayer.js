import {Observable} from "../libs/observable.js";
import {DataproviderService} from '../../node_modules/srgletterbox-web/app/dataProvider/services/DataProviderService.js';

export  class IntegrationLayer extends Observable {

    constructor(urn){
        super();
        this.dataproviderService = new DataproviderService();
        this.GetUrn(urn);
    }

    GetUrn(urn){
        // TODO --> No support default class in DataProviderService
        this.dataproviderService.getMediaCompositionByUrn(urn).then((result) => {
            Object.assign(this, result);
            this.notify(this);
        });
    }
}
