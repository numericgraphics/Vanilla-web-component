import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `player-component`
 * srg player
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class VideoJSComponent extends PolymerElement {

    get video(){
        return this.shadowRoot.getElementById('video');
    }

    static get template() {
        return html`
        <style>
            video, .container-video {
                width: 640px;
                height: 365px;
            }
            .container-video {
                position: relative; 
            }
            .vjs-control-bar {
                position: absolute;
                bottom: 0px;
                opacity: 1;

                width: 100%;
                height: 62px;
                color: #fff;
                display: grid;

                grid-template-columns: 20px 40px 100px auto 0fr 20px;
                grid-template-rows: 2px 0fr 1fr 2px;

                justify-items: center;
                align-items: center;
                grid-row-gap: 5px;
                grid-column-gap: 5px;

                background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%);
            }
            .vjs-play-control {
                grid-column-start: 2;
                grid-column-end: 3;
                grid-row-start: 3;
                grid-row-end: 4;
            }
            .vjs-volume-panel {
                grid-column-start: 3;
                grid-column-end: 4;
                grid-row-start: 3;
                grid-row-end: 4;
                justify-self: start;
            }
            .vjs-progress-control {
                grid-column-start: 2;
                grid-column-end: span 4;
                grid-row-start: 2;
                grid-row-end: 3;
                width: 100% !important;
                padding: 5px 0;
                height: 7px;
            }
            .vjs-progress-holder {
                position: relative;
                background-color: rgba(255,255,255,0.3);
                height: 5px;
                border-radius: 3px;
            }
            .vjs-load-progress {
                position: absolute;
                background-color: rgba(255,255,255,0.3);
                height: 5px;
                border-radius: 3px;
            }

            .vjs-load-progress  .vjs-control-text {
                display: none;
            }
            .vjs-play-progress{
                background-color: rgba(255,255,255,1);
                height: 5px;
                border-radius: 3px;
                position: relative;
            }
            .vjs-play-progress::before {
                content: " ";
                position: absolute;
                height: 15px;
                width: 15px;
                background-color: white;
                border-radius: 50%;
                display: inline-block;
                right: 0;
                top: -5px;
            }

            .vjs-progress-holder, .vjs-load-progress, .vjs-play-progress {
                transition: height 0.15s ease-out;
                height: 5px;
            }
            /* .vjs-control:hover .vjs-progress-holder, .vjs-control:hover .vjs-load-progress, .vjs-control:hover .vjs-play-progress{
            transition: height 0.15s ease-in;
            height: 7px;
            } */
            .vjs-play-progress .vjs-time-tooltip {
                display: none;
            }
            .vjs-mouse-display {
                position: absolute;
                top: -25px;
                margin-left: -13px;
                visibility: hidden;
                opacity: 0;
                background: rgba(255,255,255,1);
                padding: 1px 3px;
                border-radius: 2px;
                color: #000;
                font-size: 12px;
            }
            .vjs-progress-holder:hover .vjs-mouse-display {
                position: absolute;
                top: -25px;
                margin-left: -13px;
                visibility: visible;
                opacity: 1;
            }
            .vjs-time-tooltip {
                right: 0px!important;
            }

            .vjs-current-time,
            .vjs-time-divider,
            .vjs-duration {
                grid-column-start: 4;
                grid-column-end: 5;
                grid-row-start: 3;
                grid-row-end: 4;
            }
            .vjs-current-time .vjs-control-text,
            .vjs-duration .vjs-control-text
            {
                display: none;
            }
            .vjs-current-time {
                margin-right: 40px;
            }
            .vjs-duration {
                margin-left: 40px;
            }



            .vjs-poster {
                display: inline-block;
                vertical-align: middle;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                background-size: cover;
                background-color: #000000;
                cursor: pointer;
                margin: 0;
                padding: 0;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                height: 100%;
            }

            .vjs-has-started .vjs-poster {
                display: none;
            }

            .vjs-audio.vjs-has-started .vjs-poster {
                display: block;
            }

            .vjs-using-native-controls .vjs-poster {
                display: none;
            }
      </style>
      <video id="video" src=[[src]] width=[[width]] height=[[height]] controls autoplay></video>
    `;
    }
    static get properties() {
        return {
            src: {
                type: String,
                value: '',
            },
            width: {
                type: Number,
                value: '',
            },
            height: {
                type: Number,
                value: '',
            },
        };
    }
}

window.customElements.define('video-js-component', VideoJSComponent);
