
const videojsUrnMiddleware = function (player) {
    async function setSource(srcObj, next) {
        let SRGProviders = player.options_.SRGProviders;

        SRGProviders.analyticsService.setmark(SRGProviders.analyticsService.GET_URN_START);

        let mediaComposition = await SRGProviders.dataService.getMediaCompositionByUrn(srcObj.src);

        SRGProviders.analyticsService.setmark(SRGProviders.analyticsService.GET_URN_END);
        SRGProviders.analyticsService.setMeasurement('getMediaComposition', SRGProviders.analyticsService.GET_URN_START, SRGProviders.analyticsService.GET_URN_END);

        player.options_.SRGProviders.mediaCompoposition = mediaComposition;
        player.poster(`${mediaComposition.chapter.imageUrl}/scale/width/700`);
        console.log("mediacompo", mediaComposition.resources[3]);
        next(null, mediaComposition.resources[3]);
    }

    return {
        setSource,
        currentTime(ct) {
            return ct;
        }
    };
};
export default videojsUrnMiddleware;



