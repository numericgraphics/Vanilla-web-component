import {PlayerBase} from "./libs/playerBase.js";
// import videojs from '../../node_modules/video.js/dist/video.js'

import videojsUrnMiddleware from "../data/videojs-urn-middleware.js";
import {ProgressControlComponent} from "./progress-control-component.js";
import {SeekBarCustomComponent} from "./seekbar-custom-component.js";

import DataproviderService from "../../node_modules/srgletterbox-web/app/dataProvider/services/DataProviderService.js";
// import {SegmentsBrowserPlugin} from "./plugins/segments-browser.js"
// import {AnalyticsService} from "../analytics/AnalyticsService";
import PerformanceService from "../analytics/PerformanceService.js";
// import {DataProviderService} from "../data/DataProviderService.js";



class VideoJSComponent extends PlayerBase {

    constructor(videoEl, sourceEl) {
        super();
        this.videoElement = videoEl;
        this.sourceElement = sourceEl;
        videojs.use('srgssr/urn', videojsUrnMiddleware);
    }

    create() {
        console.log('VideoJSComponent create');
        // this.videoElement.classList.add('video-js', 'vjs-srgssr-skin', 'vjs-show-big-play-button-on-pause');

        let props = {
            techOrder:['html5'],
            eme:true,
            children: {
                BigPlayButton: true,
                LoadingSpinner:true,
                controlBar: {
                    children: {
                        PlayToggle: true,
                        VolumePanel: true,
                        CurrentTimeDisplay: true,
                        TimeDivider: true,
                        ProgressControlComponent: true,
                        DurationDisplay: true,
                        fullscreenToggle: true,
                    }
                }
            },
            // plugins: {
            //     SegmentsBrowserPlugin: true
            // },
            SRGProviders: {dataService: new DataproviderService(), analyticsService: PerformanceService}
        };

        this.player = videojs(this.videoElement, props, function onPlayerReady() {
            // let SRGProviders = this.options_.SRGProviders;
            // SRGProviders.analyticsService.setmark(SRGProviders.analyticsService.INIT_END);
            // SRGProviders.analyticsService.setMeasurement('initialisation', SRGProviders.analyticsService.GET_URN_START, SRGProviders.analyticsService.INIT_END);
            // console.log('onPlayerReady getEntriesByName', SRGProviders.analyticsService.getMeasurements());
        });
        // this.player.addClass('vjs-srgssr-skin', 'vjs-show-big-play-button-on-pause');
        console.log("this.player ", this.player );
        // this.player
        // this.player.src(this.sourceElement);
    }


}

export default VideoJSComponent;
