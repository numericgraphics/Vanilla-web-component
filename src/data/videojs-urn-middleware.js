
const videojsUrnMiddleware = function (player) {
    async function setSource(srcObj, next) {
        let mediaComposition = await player.options_.dataProvider.service.getMediaCompositionByUrn(srcObj.src);
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



