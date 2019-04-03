import React, {useState} from 'react';
import {PlayerBase} from "./libs/playerBase";
import videojs from '../../node_modules/video.js/dist/video.js'
import SeekBarCustomComponent from './seekbar-custom-component.js'
import ProgressControlComponent from './progress-control-component.js'
import '../../node_modules/video.js/dist/video-js.css'
import './css/style.scss';

const ProgressControl = videojs.getComponent('ProgressControl');


class VideoJSComponent extends PlayerBase {

    constructor(props) {
        super(props);
        this.videoNode = React.createRef();
    }

    componentDidMount() {
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
                       className="video-js vjs-big-play-centered vjs-srgssr-skin" controls/>
            </div>
        )
    }
}

export default VideoJSComponent;
