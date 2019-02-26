import {mixinObservable} from './mixinObservable.js';

const getStyle = () => {
    return `
      .controls-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 1;
        background-color: #111;
        width: 640px;
        height: 45px;
        color: #fff;
        text-align: left;
    }
  `
};

class ControlBarComponent extends mixinObservable(HTMLElement) {

    connectedCallback () {
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
        this.videoElementSubscription = this.videoElementSubscription.bind(this);

    }

    addStyle () {
        const styleTag = document.createElement('style');
        styleTag.textContent = getStyle();
        this.shadow.appendChild(styleTag)
    }

    getButtons () {
        this.playButton = this.shadow.getElementById("play-pause");
        this.playButton.addEventListener("click", () => {
            this.notify('play-pause');
        });
    }

    createTemplate () {
        const template = document.createElement('template');
        template.innerHTML = `
        <button type="button" id="play-pause" class="play">Play</button>
        <input type="range" id="seek-bar" value="0">
        <button type="button" id="mute">Mute</button>
        <input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1">
        <button type="button" id="full-screen">Full-Screen</button>`;
        return template;
    }

    render () {
        const div = document.createElement('div');
        div.classList.add('controls-bar');
        div.appendChild(this.createTemplate().content.cloneNode(true));
        this.addStyle();

        this.shadow.appendChild(div);
        this.getButtons();

    }

    // videoElementSubscription = (event) => {
    //     switch (event) {
    //         case 'play':
    //             this.playButton.innerHTML = "Pause";
    //             break;
    //         case 'pause':
    //             this.playButton.innerHTML = "Play";
    //             break;
    //     }
    // };

    videoElementSubscription (event){
        switch (event) {
            case 'play':
                this.playButton.innerHTML = "Pause";
                break;
            case 'pause':
                this.playButton.innerHTML = "Play";
                break;
        }
    }
}

customElements.define('control-bar-component', ControlBarComponent);

