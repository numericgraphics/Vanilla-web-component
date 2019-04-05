import React from 'react';
import {PlayerBase} from "./libs/playerBase";
import videojs from '../../node_modules/video.js/dist/video.js'
import videojsUrnMiddleware from "../data/videojs-urn-middleware";
import ProgressControlComponent from "./progress-control-component.js";
import SeekBarCustomComponent from "./seekbar-custom-component.js";
import '../../node_modules/video.js/dist/video-js.css';
import './css/vjs-srgssr-skin.scss';
import {DataproviderService} from "srgletterbox-web/app/dataProvider/services/DataProviderService";


class VideoJSComponent extends PlayerBase {

    constructor(props) {
        super(props);
        this.videoNode = React.createRef();
        videojs.use('srgssr/urn', videojsUrnMiddleware);
    }

    componentDidMount() {
        console.log('VideoJSComponent componentDidMount');
        let props = {
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
            dataProvider: {service:new DataproviderService()}
        };
        this.player = videojs(this.videoNode, props, function onPlayerReady() {
            console.log('onPlayerReady', this);
        });
        this.player.src({type: 'srgssr/urn', src: this.props.urn});
    }

    render() {
        return (
            <div data-vjs-player>
                <video ref={node => this.videoNode = node} width={this.props.width} height={this.props.height}
                       className="video-js vjs-srgssr-skin" controls>
                </video>
            </div>
        )
    }
}

export default VideoJSComponent;
