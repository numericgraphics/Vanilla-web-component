import {DataproviderService} from "srgletterbox-web/app/dataProvider/services/DataProviderService";

const videojsUrnMiddleware = function (player) {
    console.log("PLAYER", player);
    async function setSource(srcObj, next) {
        console.log("setSource", srcObj);
        this.dataproviderService = new DataproviderService();
        let mediaComposition = await this.dataproviderService.getMediaCompositionByUrn(srcObj.src).then((result) => {
            result.json();
        });
        let chapter = mediaComposition.chapterList.find( chapter => chapter.urn === mediaComposition.chapterUrn);
        next(null, chapter.resourceList.map(item => item.url));
    }

    return {
        setSource,
        currentTime(ct) {
            return ct;
        }
    };
};
export default videojsUrnMiddleware;



