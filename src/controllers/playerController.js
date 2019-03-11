import {Events} from "../model/events";

export class PlayerController {

    constructor(model, videoElement){
        this.model = model;
        this.videoElement = videoElement.current;
        this.resourceListReady = this.resourceListReady.bind(this);

        this.model.subscribe(Events.RESOURCE_LIST_READY, this.resourceListReady);
    }

    resourceListReady(resourceList) {
        this.videoElement.player.src(resourceList);
    }
}
