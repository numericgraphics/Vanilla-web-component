import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './components/videoJSComponent.js'
import './components/controlBarComponent.js'
import PlayerController from './controllers/playerController.js'

/**
 * `player-component`
 * srg player
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PlayerComponent extends PolymerElement {
  static get template() {
    return html`
      <style>
        .container-video {
                    width: 640px;
                    height: 365px;
                    position: relative;
                }
      </style>
      <div class="container-video">
        <video-js-component id="videoElement" src="" width="640" height="365"></video-js-component>
        <!--<control-bar-component id="controlBar"></control-bar-component>-->
      </div>
    `;
  }

  ready() {
    super.ready();
    this.videoElement = this.shadowRoot.getElementById('videoElement');
    this.controlBar = this.shadowRoot.getElementById('controlBar');
    this.playerController = new PlayerController(this.videoElement, this.controlBar);
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("connectedCallback", this.shadowRoot);
  }
}

window.customElements.define('player-component', PlayerComponent);
