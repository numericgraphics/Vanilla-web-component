import {DataproviderService} from "srgletterbox-web/app/dataProvider/services/DataProviderService";

const videojsUrnMiddleware = function (player) {
    async function setSource(srcObj, next) {
        this.dataproviderService = new DataproviderService();
        let mediaComposition = await this.dataproviderService.getMediaCompositionByUrn(srcObj.src).then(result => result);
        console.log("perf1");
        let chapter = mediaComposition.chapterList.find( chapter => chapter.urn === mediaComposition.chapterUrn);
        console.log("perf2");
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

        next(null, resources[0]);
    }

    return {
        setSource,
        currentTime(ct) {
            return ct;
        }
    };
};
export default videojsUrnMiddleware;



