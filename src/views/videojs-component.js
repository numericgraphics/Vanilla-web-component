import React, {useState} from 'react';

import {PlayerBase} from "./libs/playerBase";
import videojs from '../../node_modules/video.js/dist/video.js'
import SeekBarCustomComponent from './seekbar-custom-component.js'
import ProgressControlComponent from './progress-control-component.js'
import '../../node_modules/video.js/dist/video-js.css'
import './css/style.scss';
// import './css/seekbar.scss';
const ProgressControl = videojs.getComponent('ProgressControl');


class VideoJSComponent extends PlayerBase {

    constructor(props) {
        super(props);
        this.videoNode = React.createRef();
    }

    componentDidMount() {
        let props = {
            children: {
                controlBar: {
                    children: {
                        PlayToggle: true,
                        VolumePanel: true,
                        CurrentTimeDisplay: true,
                        TimeDivider: true,
                        ProgressControlComponent: true,
                        DurationDisplay: true,
                    }
                }
            }
        };

        let propstest = {
            children: {
                controlBar: {
                    children: [
                        'playToggle',
                        'volumePanel',
                        'currentTimeDisplay',
                        'timeDivider',
                        'durationDisplay',
                        'ProgressControlComponent',
                        'liveDisplay',
                        'seekToLive',
                        'remainingTimeDisplay',
                        'customControlSpacer',
                        'playbackRateMenuButton',
                        'chaptersButton',
                        'descriptionsButton',
                        'subsCapsButton',
                        'audioTrackButton',
                        'fullscreenToggle'
                    ]
                }
            }
        };

        this.player = videojs(this.videoNode, props, function onPlayerReady() {
            console.log('onPlayerReady', this);
        });
    }

    render() {
        return (
            <div data-vjs-player>
                <video ref={node => this.videoNode = node} width={this.props.width} height={this.props.height}
                       className="video-js vjs-srgssr-skin" controls/>
            </div>
        )
    }
}

export default VideoJSComponent;
