import PubSub from '../lib/pubsub.js';

export default class PlayerController {

    constructor(model, videoElement, controlBar){
        console.log("constructor playerController");
        this.model = model;
        this.videoElement = videoElement;
        this.controlBar = controlBar;
        this.events = new PubSub();

        this.registerSubscriptions();
        this.setVideoElementSource(this.model.getUrn());
    }


    registerSubscriptions () {
        // this.videoElement.subscribe(this.videoElementSubscription);
        this.events.subscribe('timeUpdate', this.controlBar.videElementTimeupdateSubscription);
        this.videoElement.subscribe(this.controlBar.videoElementSubscription);
        this.controlBar.subscribe(this.videoElement.controlBarSubscription);
    }

    setVideoElementSource (url){
        console.log("playerController setVideoElementSource", url);
        this.videoElement.getVideoElement().src = url;
    }
}
