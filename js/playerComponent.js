import './components/videoComponent.js'
import './components/controlBarComponent.js'
import Model from './model/index.js'
import PlayerController from './controllers/playerController.js'



class PlayerComponent extends HTMLElement {

    videoWidth = 640;
    videoHeight = 365;

    getStyle = () => {
        return `.container-video {
                    width: ${this.videoWidth};
                    height: ${this.videoHeight};
                    position: relative;
                }`
    };


    constructor(){
        super();
        console.log("constructor playerComponent");
        this.model = new Model(this.getAttribute('urn'));
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
        container.innerHTML =   `<video-component src="" id="videoElement" width=${this.videoWidth} height=${this.videoHeight}></video-component>
                                <control-bar-component id="controlBar"></control-bar-component>`;
        return container
    }

    render () {
        this.shadow.appendChild(this.createTemplate())
    }

    connectedCallback () {
        console.log("connectedCallback");
        this.render();
        this.shadowDomReady();
    }

}

customElements.define('player-component', PlayerComponent);

