
const videojsUrnMiddleware = function (player) {
    async function setSource(srcObj, next) {
        let mediaComposition = await player.options_.dataProvider.service.getMediaCompositionByUrn(srcObj.src);
        player.options_.dataProvider.mediaCompoposition = mediaComposition;
        player.poster(`${mediaComposition.chapter.imageUrl}/scale/width/700`);
        next(null, mediaComposition.resources[0]);
    }

    return {
        setSource,
        currentTime(ct) {
            return ct;
        }
    };
};
export default videojsUrnMiddleware;



