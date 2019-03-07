import '../view/components/videoJSComponent.js'
import Model from "../model/model.js";


export default class PlayerController {

    constructor(model, videoElement, controlBar){
        this.model = model;
        this.videoElement = videoElement;
        this.controlBar = controlBar;

        this.resourceListReady = this.resourceListReady.bind(this);

        this.initView();
        this.model.subscribe(Model.RESOURCE_LIST_READY, this.resourceListReady);

    }

    addVideoJS(){

        // this.media = window.videojs(this.videoElement.video);

        this.media = window.videojs(this.videoElement.video, {children : { controlBar: {children : {
                        PlayToggle: true,
                        VolumePanel:true,
                        CurrentTimeDisplay:false,
                        TimeDivider:false,
                        ProgressControl : {children :{  SeekBar: true,
                                                        // LoadProgressBar: true,
                                                        // MouseTimeDisplay: true,
                                                        // PlayProgressBar: true,
                            }},
                        DurationDisplay:true,

                    }} }});

        /*
        this.media = window.videojs(this.videoElement.video, {children : { controlBar: {
                    PlayToggle: true,
                    VolumePanel:false,
                    CurrentTimeDisplay:false,
                    TimeDivider:false,
                    DurationDisplay:false,
                    ProgressControl:false,
                    LiveDisplay:false,
                    RemainingTimeDisplay:false,
                    PlaybackRateMenuButton:false,
                    ChaptersButton:false,
                    DescriptionsButton:false,
                    SubtitlesButton:false,
                    CaptionsButton:false,
                    AudioTrackButton:false,
                    FullscreenToggle:false,
            }}});*/
    }



    initView() {
        this.addVideoJS();

    }

    resourceListReady(resourceList) {
        this.media.src(resourceList);
    }
}
