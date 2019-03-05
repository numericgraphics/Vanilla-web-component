import '../components/videoJSComponent.js'

export default class PlayerController {

    constructor(videoElement, controlBar){
        this.videoElement = videoElement;
        this.controlBar = controlBar;

        this.addVideoJS();
        this.media.src('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    }

    addVideoJS(){
        this.media = window.videojs(this.videoElement.video, {children:[]});
    }
}
