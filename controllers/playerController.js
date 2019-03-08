import '../view/components/videoJSComponent.js'
import {Events} from "../model/events";


export class PlayerController {

    constructor(model, videoElement, controlBar){
        this.model = model;
        this.videoElement = videoElement;
        this.controlBar = controlBar;

        this.resourceListReady = this.resourceListReady.bind(this);

        this.initView();
        this.model.subscribe(Events.RESOURCE_LIST_READY, this.resourceListReady);
    }

    addVideoJS(){
        this.media = window.videojs(this.videoElement.video, {children : { controlBar: {children : {
                        PlayToggle: true,
                        VolumePanel:true,
                        CurrentTimeDisplay:false,
                        TimeDivider:false,
                        ProgressControl : {children :{  SeekBar: true,
                            }},
                        DurationDisplay:true,

                    }
                }
            }
        });
    }

    initView() {
        this.addVideoJS();
    }

    resourceListReady(resourceList) {
        this.media.src(resourceList);
    }
}
