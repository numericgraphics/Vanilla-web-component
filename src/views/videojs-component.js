import React, {useState} from 'react';
import {PlayerBase} from "./libs/playerBase";
import videojs from '../../node_modules/video.js/dist/video.js'
import SeekBarCustomComponent from './seekbar-custom-component.js'
import ProgressControlComponent from './progress-control-component.js'
import '../../node_modules/video.js/dist/video-js.css'
import './css/style.scss';
import videojsUrnMiddleware from "../model/videojs-urn-middleware";
import {DataproviderService} from "srgletterbox-web/app/dataProvider/services/DataProviderService";

const ProgressControl = videojs.getComponent('ProgressControl');


class VideoJSComponent extends PlayerBase {

    constructor(props) {
        super(props);
        console.log('VideoJSComponent constructor');
        this.videoNode = React.createRef();
        this.createVideojs();
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
            }
        };
        this.player = videojs(this.videoNode, props, function onPlayerReady() {
            console.log('onPlayerReady', this);
        });
    }

    render() {
        console.log('render');
        return (
            <div data-vjs-player>
                <video ref={node => this.videoNode = node} width={this.props.width} height={this.props.height}
                       className="video-js vjs-big-play-centered vjs-srgssr-skin" controls>
                    <source src={this.props.urn} type="srgssr/urn"/>
                </video>
            </div>
        )
    }

    createVideojs() {
        console.log('createVideojs');

        videojs.use('srgssr/urn', function (player) {
            console.log("PLAYER", player);
            async function setSource(srcObj, next) {
                console.log("setSource", srcObj);
                // this.dataproviderService = new DataproviderService();
                // let mediaComposition = await this.dataproviderService.getMediaCompositionByUrn(srcObj.src).then((result) => {
                //     result.json();
                // });
                // let chapter = mediaComposition.chapterList.find( chapter => chapter.urn === mediaComposition.chapterUrn);
                // next(null, chapter.resourceList.map(item => item.url));
                next();
            }

            return {
                setSource,
                currentTime(ct) {
                    return ct;
                }
            };
        });

    }
}

export default VideoJSComponent;
