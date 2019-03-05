import './components/videoComponent.js'
import './components/videoJSComponent.js'
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
        this.videoElement = this.getAttribute('player')     ? document.createElement('video-js-component')
                                                                        : document.createElement('video-component');

        this.videoElement.setAttribute('id', 'videoElement');
        this.videoElement.setAttribute('width', this.videoWidth);
        this.videoElement.setAttribute('height', this.videoHeight);
        container.appendChild(this.videoElement);

        this.controlBar = document.createElement('control-bar-component');
        this.controlBar.setAttribute('id', 'controlBar');
        container.appendChild(this.controlBar);

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

