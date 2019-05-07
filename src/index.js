import videojsUrnMiddleware from "./data/videojs-urn-middleware.js";
import {ProgressControlComponent} from "./videojs-components/progress-control-component.js";
import {SeekBarCustomComponent} from "./videojs-components/seekbar-custom-component.js";
import SeekToLiveComponent from "./videojs-components/seekToLive-component.js";
import LiveTrackerComponent from "./videojs-components/liveTracker-component.js";
import CurrentTimeDisplayComponent from "./videojs-components/currentTimeDisplay-component.js";
import DataproviderService from "../node_modules/srgletterbox-web/app/dataProvider/services/DataProviderService.js";
import PerformanceService from "./analytics/PerformanceService.js";
import SRGSSRButtonComponent from "./videojs-components/SRGSSR-button-component.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let elVideo = document.querySelector('video');
    const sourceElement = {type: 'srgssr/urn', src: elVideo.dataset.urn};

    let props = {
        bu: elVideo.dataset.bu || 'rts',
        techOrder:['html5'],
        liveui: true,
        liveTracker:true,
        children: {
            MediaLoader:true,
            BigPlayButton: true,
            LoadingSpinner:true,
            ControlBar: {
                children: {
                    PlayToggle: true,
                    VolumePanel: true,
                    CurrentTimeDisplayComponent: true,
                    TimeDivider: true,
                    DurationDisplay: true,
                    ProgressControlComponent: {
                        children: {
                            SeekBarCustomComponent: true,
                            SeekToLiveComponent: true,
                        }
                    },
                    fullscreenToggle: true,
                    SRGSSRButtonComponent: true,
                }
            }
        },
        SRGProviders: {dataService: new DataproviderService(), analyticsService: PerformanceService}
    };
    videojs.use('srgssr/urn', videojsUrnMiddleware);
    let player = videojs(elVideo, props, function () {
        let SRGProviders = this.options_.SRGProviders;

    });
    player.src(sourceElement);


});
