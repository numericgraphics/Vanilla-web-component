import './videoComponent.js'
import './controlBarComponent.js'
import './testComponent.js'


const videoWidth = 640;
const videoHeight = 365;
const getStyle = () => {
    return `
      .container-video {
        width: ${videoWidth};
        height: ${videoHeight};
        position: relative;
    }
  `
}

class PlayerComponent extends HTMLElement {
    connectedCallback () {
        this.shadow = this.attachShadow({mode: 'open'});
        this.url = this.getAttribute('url');
        this.render();
        this.videoElement = this.shadow.getElementById('videoElement');
        this.controlBar = this.shadow.getElementById('controlBar');


    }

    addStyle () {
        const styleTag = document.createElement('style');
        styleTag.textContent = getStyle();
        this.shadow.appendChild(styleTag)
    }

    // videoElementSubscription = (event) => {
    //     console.log("videoElementSubscription this", this)
    // };

    createPlayerContainer () {
        const container = document.createElement('div');
        container.classList.add('container-video');
        this.addStyle();
        container.innerHTML =   `<video-component src=${this.url} id="videoElement" width=${videoWidth} height=${videoHeight}></video-component>
                                <control-bar-component id="controlBar"></control-bar-component>`;
        return container
    }

    render () {
        this.shadow.appendChild(this.createPlayerContainer())
    }

    registerSubscriptions () {
        // this.videoElement.subscribe(this.videoElementSubscription);
        this.videoElement.subscribe(this.controlBar.videoElementSubscription);
        this.controlBar.subscribe(this.videoElement.controlBarSubscription);
    }
}

customElements.define('player-component', PlayerComponent)

