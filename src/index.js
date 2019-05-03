import videojsUrnMiddleware from "./data/videojs-urn-middleware.js";
import {ProgressControlComponent} from "./videojs-components/progress-control-component.js";
import {SeekBarCustomComponent} from "./videojs-components/seekbar-custom-component.js";
import SeekToLiveComponent from "./videojs-components/seekToLive-component.js";
import LiveTrackerComponent from "./videojs-components/liveTracker-component.js";
import DataproviderService from "../node_modules/srgletterbox-web/app/dataProvider/services/DataProviderService.js";
import PerformanceService from "./analytics/PerformanceService.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let elVideo = document.querySelector('video');
    const sourceElement = {type: 'srgssr/urn', src: 'urn:rts:video:1967124'}; //rts vod :urn:rts:video:6735513 - rts info : urn:rts:video:1967124

    let props = {
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
                    CurrentTimeDisplay: true,
                    TimeDivider: true,
                    DurationDisplay: true,
                    ProgressControlComponent: true,
                    LiveDisplay:true,
                    SeekToLiveComponent:true,
                    fullscreenToggle: true,
                }
            }
        },
        SRGProviders: {dataService: new DataproviderService(), analyticsService: PerformanceService}
    };
    videojs.use('srgssr/urn', videojsUrnMiddleware);
    let player = videojs(elVideo, props, function () {
        let SRGProviders = this.options_.SRGProviders;
    });
    // player.children().filter(children => children.name_ === 'LiveTracker')[0] = new LiveTrackerComponent(player);
    player.src(sourceElement);


});
