import {IntegrationLayer} from "./integrationLayer.js";

const videojsUrnMiddleware = function (player) {
    async function setSource(srcObj, next) {
        this.integrationLayer = new IntegrationLayer();
        let resources = await this.integrationLayer.getResourcesList(srcObj.src);
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



