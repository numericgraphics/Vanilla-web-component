import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './view/components/videoJSComponent.js'
import './view/components/controlBarComponent.js'
import PlayerController from './controllers/playerController.js'
import Model from './model/model.js'

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

  static get properties() {
    return {
      urn: {
        type: String,
        value: '',
      }
    };
  }

  ready() {
    super.ready();
    this.videoElement = this.shadowRoot.getElementById('videoElement');
    this.controlBar = this.shadowRoot.getElementById('controlBar');
    this.model = new Model(this.urn);
    this.playerController = new PlayerController(this.model, this.videoElement, this.controlBar);
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("connectedCallback", this.shadowRoot);
  }
}

window.customElements.define('player-component', PlayerComponent);
