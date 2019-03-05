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
