import React, { useState } from 'react';

import {PlayerBase} from "./libs/playerBase";
import {PlayProgressBarComponent} from "./playprogressbar-component";
import videojs from '../../node_modules/video.js/dist/video.js'
import SeekBarCustomComponent from './seekbar-custom-component.js'
import '../../node_modules/video.js/dist/video-js.css'
import './css/style.scss';
 import './css/seekbar.scss';




class VideoJSComponent extends PlayerBase {

    constructor(props){
        super(props);
        this.videoNode = React.createRef();
    }

    componentDidMount() {
        // videojs.registerComponent('SeekBarCustomComponent', SeekBarCustomComponent);
        // videojs.registerComponent('SeekBarComponent', SeekbarComponent);
        // videojs.registerComponent('PlayProgressBarComponent', PlayProgressBarComponent);
        let props = {children : { controlBar: {children : {
                        PlayToggle: true,
                        VolumePanel:true,
                        CurrentTimeDisplay:false,
                        TimeDivider:false,
                        ProgressControl : {children : {  SeekBarCustomComponent: {LoadProgressBar:true,  MouseTimeDisplay:true,  PlayProgressBarComponent:true} }},
                        // ProgressControl : {children : {  SeekBarCustomComponent: true }},
                        // ProgressControl : true,
                        DurationDisplay:true,

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
                <video ref={ node => this.videoNode = node } width={this.props.width} height={this.props.height} className="video-js vjs-srgssr-skin" controls />
            </div>
        )
    }
}

export default VideoJSComponent;
