import videojs from '../../node_modules/video.js/dist/video.js'
const SeekBar = videojs.getComponent('SeekBar');

export class SeekBarCustomComponent extends SeekBar {

    constructor(player, options, ready) {
        super(player, options, ready);

        let parent = Object.getPrototypeOf(SeekBar);
        console.log("constructor", parent.prototype);

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);

        this.newTime = undefined;
        this.position = undefined;

    }

    _percentage = function (time, duration) {
        return (time / duration) * 100;
    }

    handleMouseDown(event) {
        console.log("width", this);
        if (event) {
            event.stopPropagation();
        }
        if (event.type === 'mousedown') {
            event.preventDefault();
        }
        if (event.type === 'touchstart' && !videojs.IS_CHROME) {
            event.preventDefault();
        }
        videojs.dom.blockTextSelection();
        this.addClass('vjs-sliding');
        this.trigger('slideractive');
        this.player_.scrubbing(true);
        const doc = this.bar.el_.ownerDocument;
        this.on(doc, 'mousemove', this.handleMouseMove);
        this.on(doc, 'mouseup', this.handleMouseUp);
        this.on(doc, 'touchmove', this.handleMouseMove);
        this.on(doc, 'touchend', this.handleMouseUp);
        this.videoWasPlaying = !this.player_.paused();
        this.player_.pause();
        this.calculateNewTime(event);
        this.setPosition(event.clientX);
        // this.player_.currentTime(this.newTime);
    }

    /**/
    handleMouseMove(event) {
        this.calculateNewTime(event);
        this.setPosition(event.clientX);
    }

    handleMouseUp(event) {
        if (event) {
            event.stopPropagation();
        }
        super.handleMouseUp(event);
        this.player_.currentTime(this.newTime);
        this.setPosition(event.clientX);
        this.seekBarRect = undefined;  /**/
        console.log("handMouseUp play", this.videoWasPlaying);
        if (this.videoWasPlaying) {
            console.log("handMouseUp play");
            this.player_.play();
        }
    }

    setPosition(position) {

        if (this.seekBarRect === undefined) {
            this.seekBarRect = videojs.dom.getBoundingClientRect(this.bar.el_);
        }
        this.bar.el_.style.width =  Math.ceil(this._percentage(this.newTime, this.player_.duration())) + '%';
        // console.log("setPosition width", this.el());
        // console.log("setPosition width", this.bar.el_);
        console.log("setPosition newTime", this.newTime);
        console.log("setPosition percent", this._percentage(this.newTime, this.player_.duration()));
        console.log("setPosition width", this.bar.el_.style.width);
        console.log("----------------------");
         // this.bar.el_.style.width = (position > videojs.dom.getBoundingClientRect(this.el()).width ? videojs.dom.getBoundingClientRect(this.el()).width : position - this.seekBarRect.left)+ 'px';

    }

    update(){
        super.update();
    }

    calculateNewTime(event) {
        const distance = this.calculateDistance(event);
        const liveTracker = this.player_.liveTracker;

        if (!liveTracker || !liveTracker.isLive()) {
            this.newTime = distance * this.player_.duration();

            if (this.newTime === this.player_.duration()) {
                this.newTime = this.newTime - 0.1;
            }
        } else {
            const seekableStart = liveTracker.seekableStart();
            const seekableEnd = liveTracker.liveCurrentTime();

            this.newTime = seekableStart + (distance * liveTracker.liveWindow());

            if (this.newTime >= seekableEnd) {
                this.newTime = seekableEnd;
            }

            if (this.newTime <= seekableStart) {
                this.newTime = seekableStart + 0.1;
            }

            if (this.newTime === Infinity) {
                return;
            }
        }
    }


}


SeekBarCustomComponent.prototype.playerEvent = 'timeupdate';
SeekBarCustomComponent.prototype.options_ = {
    children: [
        'loadProgressBar',
        'PlayProgressBar'
    ],
    barName: 'PlayProgressBar'
};
videojs.registerComponent('SeekBarCustomComponent', SeekBarCustomComponent);
