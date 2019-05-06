import AkamaiTokenService from "../../token/AkamaiTokenService.js";

const videojsUrnMiddleware = function (player) {
    // player.eme();
    async function setSource(srcObj, next) {
        let SRGProviders = player.options_.SRGProviders;

        // SRGProviders.analyticsService.setmark(SRGProviders.analyticsService.GET_URN_START);

        let mediaComposition = await SRGProviders.dataService.getMediaCompositionByUrn(srcObj.src);

        // SRGProviders.analyticsService.setmark(SRGProviders.analyticsService.GET_URN_END);
        // SRGProviders.analyticsService.setMeasurement('getMediaComposition', SRGProviders.analyticsService.GET_URN_START, SRGProviders.analyticsService.GET_URN_END);

        player.options_.SRGProviders.mediaCompoposition = mediaComposition;
        player.poster(`${mediaComposition.chapter.imageUrl}/scale/width/700`);
        let tokenService =  new AkamaiTokenService();
        let resourceIndex = 3;
        let sourceUrl = mediaComposition.resources[resourceIndex].src.toString();
        let tokenizedSource = await tokenService.tokenize(sourceUrl);
        mediaComposition.resources[resourceIndex].src = tokenizedSource;

        player.src(tokenizedSource);
        next(null, tokenizedSource);

        // player.src(sourceUrl);
        // next(null, sourceUrl);
    }

    return {
        setSource,
        currentTime(ct) {
            return ct;
        }
    };
};
export default videojsUrnMiddleware;



