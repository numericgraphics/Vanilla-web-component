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
            video {
                width: 640px;
                height: 365px;
            }
      </style>
      <style>            
            .vjs-control-bar{
                position: absolute;
                bottom: 0px;
                left: 0;
                right: 0;
                opacity: 1;
                background-color: #111;
                width: 640px;
                height: 62px;
                color: #fff;
                display: grid;
                
                grid-template-columns: 20px 40px 100px auto 0fr 20px;
                grid-template-rows: 2px 0fr 1fr 2px;
                
                justify-items: center;
                align-items: center;
                grid-row-gap: 5px;
                grid-column-gap: 5px;
                
                background: rgba(255,255,255,0);
                background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);
                background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(0,0,0,0.5)));
                background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);
                background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);
                background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);
                background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#000000', GradientType=0 );
            }
            .vjs-play-control{
                grid-column-start: 2;
                grid-column-end: 3;
                grid-row-start: 3;
                grid-row-end: 4;
            }
            .vjs-volume-panel{
                grid-column-start: 3;
                grid-column-end: 4;
                grid-row-start: 3;
                grid-row-end: 4;
                justify-self: start;
            }
            .vjs-progress-control{
                grid-column-start: 2;
                grid-column-end: span 4;
                grid-row-start: 2;
                grid-row-end: 3;
                width: 100% !important;
            }
            .vjs-progress-holder {
                position: relative;
                background-color: rgba(255,255,255,0.3);
                height: 5px;
            }
            .vjs-load-progress{
                position: absolute;
                background-color: rgba(255,255,255,0.3);
                height: 5px;
            }
            .vjs-load-progress  .vjs-control-text{
                display: none;
            }
            .vjs-play-progress{
                background-color: rgba(255,255,255,1);
                height: 5px;
            }
            .vjs-play-progress .vjs-time-tooltip{
                display: none;
            }
            .vjs-mouse-display{
                position: absolute;
                top: -20px;
                margin-left: -13px;
                visibility: hidden;
                opacity: 0;
                transition: opacity 0.4s;
            }
            .vjs-progress-holder:hover .vjs-mouse-display {
                position: absolute;
                top: -20px;
                margin-left: -13px;
                visibility: visible;
                opacity: 1;
            }
            .vjs-time-tooltip{
                right: 0px!important;
            }
            .video-js .vjs-play-progress:before  {
                position: absolute;
                height: 15px;
                width: 15px;
                background-color: white;
                border-radius: 50%;
                display: inline-block;
            }
            .vjs-current-time,
            .vjs-time-divider,
            .vjs-duration
             {
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
