import './components/videoComponent.js'
import './components/controlBarComponent.js'
import Model from './model/index.js'
import PlayerController from './controllers/playerController.js'
import PubSub from "./lib/pubsub.js";



class PlayerComponent extends HTMLElement {

    getStyle () {
        return `.container-video {
                    width: ${this.videoWidth};
                    height: ${this.videoHeight};
                    position: relative;
                }`
    };

    constructor(){
        super();

        this.model = new Model(this.getAttribute('urn'));

        this.videoWidth = 640;
        this.videoHeight = 365;
        this.shadow = this.attachShadow({mode: 'open'});
    }

    shadowDomReady () {
        this.videoElement = this.shadow.getElementById('videoElement');
        this.controlBar = this.shadow.getElementById('controlBar');
        this.controller = new PlayerController(this.model, this.videoElement, this.controlBar);
    }

    addStyle () {
        const styleTag = document.createElement('style');
        styleTag.textContent = this.getStyle();
        this.shadow.appendChild(styleTag)
    }

    // videoElementSubscription = (event) => {
    //     console.log("videoElementSubscription this", this)
    // };

    createTemplate () {
        const container = document.createElement('div');
        container.classList.add('container-video');
        this.addStyle();
        container.innerHTML =   `<video-component src="" id="videoElement" events=${this.eventsManager} width=${this.videoWidth} height=${this.videoHeight}></video-component>
                                <control-bar-component events=${this.eventsManager}  id="controlBar"></control-bar-component>`;
        return container
    }

    render () {
        this.shadow.appendChild(this.createTemplate())
    }

    connectedCallback () {
        this.render();
        this.shadowDomReady();
    }

}

customElements.define('player-component', PlayerComponent);

