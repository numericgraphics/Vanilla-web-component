
export default class PlayerController {

    constructor(model, videoElement, controlBar){
        console.log("constructor playerController videoElement", videoElement);
        this.model = model;
        this.videoElement = videoElement;
        this.controlBar = controlBar;

        this.registerSubscriptions();
        this.setVideoElementSource(this.model.getUrn());
    }


    registerSubscriptions () {
        // this.videoElement.subscribe(this.videoElementSubscription);
        // this.events.subscribe('timeUpdate', this.controlBar.videElementTimeupdateSubscription);
        this.videoElement.subscribe(this.controlBar.videoElementSubscription);
        this.controlBar.subscribe(this.videoElement.controlBarSubscription);
        this.videoElement.subscribeEvent('timeupdate', this.controlBar.update);
        // this.videoElement.timeUpdateSubscribe(this.controlBar.videElementTimeupdateSubscription);
    }

    setVideoElementSource (url){
        console.log("playerController setVideoElementSource", this.videoElement.getVideoElement());
        this.videoElement.getVideoElement().src = url;
        this.videoElement.getVideoElement().width = 640;
        this.videoElement.getVideoElement().height = 365;
    }
}
