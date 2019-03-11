import React, { useState } from 'react';
import videojs from '../../node_modules/video.js/dist/video.js'
import '../../node_modules/video.js/dist/video-js.css'
import './css/style.css';

import {PlayerBase} from "./libs/playerBase";

class VideoJSComponent extends PlayerBase {

    constructor(props){
        super(props);
        this.videoNode = React.createRef();
    }

    componentDidMount() {
        let props = {children : { controlBar: {children : {
                        PlayToggle: true,
                        VolumePanel:true,
                        CurrentTimeDisplay:false,
                        TimeDivider:false,
                        ProgressControl : {children : {  SeekBar: true }},
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
                <video ref={ node => this.videoNode = node } width={this.props.width} height={this.props.height} className="video-js vjs-srgssr-skin" controls autoPlay/>
            </div>
        )
    }
}

export default VideoJSComponent;
