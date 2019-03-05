import {mixinPubSub} from '../lib/mixinPubSub.js';

class VideoComponent extends mixinPubSub(HTMLElement)  {

    constructor(){
        super();
        this.src = this.getAttribute('src');
        this.width = this.getAttribute('width');
        this.height = this.getAttribute('height');
    }

    connectedCallback () {
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
        this.controlBarSubscription = this.controlBarSubscription.bind(this);
        console.log("VideoComponent connectedCallback eventsManager", this.eventsManager);
    }

    addVideoListeners () {
        let handler = (event) => {
            this.notify(event.type);
        };
        ['play', 'pause', 'seeking', "ended"].forEach(event => this.video.addEventListener(event, handler));

        this.video.addEventListener('timeupdate', (event) => {
            this.publishEvent('timeupdate', {  currentTime: this.video.currentTime,
                                                                    durration: this.video.duration,
                                                                    percent: (this.video.currentTime*100)/this.video.duration});
        })
    }

    render () {
        this.video = document.createElement('video');
        this.video.id = 'myVideo';
        this.video.src = this.src;
        this.video.width = this.width;
        this.video.height = this.height;
        this.video.controls = false;
        this.video.autoplay = false;
        this.video.muted = true;
        this.addVideoListeners();
        this.shadow.appendChild(this.video)
    }

    getVideoElement () {
        return this.video;
    }

    controlBarSubscription (event) {
        switch (event) {
            case 'play-pause':
                if (this.video.paused) {
                    this.video.play();
                }else {
                    this.video.pause();
                }
                break
        }
    }
}

customElements.define('video-component', VideoComponent);
