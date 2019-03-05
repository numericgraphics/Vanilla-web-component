import {mixinPubSub} from '../lib/mixinPubSub.js';

class VideoJSComponent extends mixinPubSub(HTMLElement)  {

    constructor(){
        super();

    }

    connectedCallback () {
        this.shadow = this.attachShadow({mode: 'open'});
        this.src = this.getAttribute('src');
        this.width = this.getAttribute('width');
        this.height = this.getAttribute('height');
        this.render();
        this.controlBarSubscription = this.controlBarSubscription.bind(this);
    }

    bindEvents (player) {
        let handler = (event) => {
            this.notify(event.type);
        };
        ['play', 'pause'].forEach(event => player.on(event, handler));

        player.on('timeupdate', () => {
            this.publishEvent('timeupdate', {  currentTime: this.video.currentTime,
                                                                    durration: this.video.duration,
                                                                    percent: (this.video.currentTime*100)/this.video.duration});
        });
        return player;
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

        this.media = this.bindEvents(window.videojs(this.video));

        this.shadow.appendChild(this.video);
    }

    getVideoElement () {
        return this.video;
    }

    getMediaElement () {
        return this.media;
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

customElements.define('video-js-component', VideoJSComponent);
