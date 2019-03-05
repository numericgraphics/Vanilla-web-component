import '../components/videoJSComponent.js'

export default class PlayerController {

    constructor(model, videoElement, controlBar){
        this.model = model;
        this.videoElement = videoElement;
        this.controlBar = controlBar;

        this.initModel();
        this.initView();
    }

     initModel(){
         this.model.init();
    }

    addVideoJS(){
        this.media = window.videojs(this.videoElement.video, {children:[]});
    }

    initView() {
        this.addVideoJS();
        this.media.src('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    }
}
