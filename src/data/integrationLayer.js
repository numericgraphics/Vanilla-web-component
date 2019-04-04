import {Observable} from "../libs/observable.js";
import DataproviderService from '../../node_modules/srgletterbox-web/app/dataProvider/services/DataProviderService.js';

export  class IntegrationLayer extends Observable {

    constructor(){
        super();
        this.dataproviderService = new DataproviderService();
    }

    getMediaComposition(urn){
       return this.dataproviderService.getMediaCompositionByUrn(urn).then(result => result);
    }

    async getResourcesList(urn){
        let mediaComposition = await this.getMediaComposition(urn);
        let chapter = mediaComposition.chapterList.find( chapter => chapter.urn === mediaComposition.chapterUrn);
        let resourceList = chapter.resourceList.map(item => item.url);
        let mimes = chapter.resourceList.map(item => item.mimeType);
        let resources = [];
        resourceList.forEach(element => {
            resources.push({
                src: element
            });
        });
        mimes.forEach((element, i) => {
            resources[i].type = element;
        });
        return resources;
    }

}
