import videojs from '../../node_modules/video.js/dist/video.js'
import {detectmob} from '../utils/userAgentDetection.js'
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

    _percentage(time, duration) {
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
        if (detectmob()){
            console.log("is mobile");
            this.on(doc, 'touchmove', this.handleMouseMove);
            this.on(doc, 'touchend', this.handleMouseUp);
        }

         this.calculateNewTime(event);
         this.player_.currentTime(this.newTime);

        this.videoWasPlaying = !this.player_.paused();
        if (this.videoWasPlaying) {
            this.player_.pause();
        }
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
        // super.handleMouseUp(event);
        const doc = this.bar.el_.ownerDocument;

        videojs.dom.unblockTextSelection();
        this.removeClass('vjs-sliding');
        this.trigger('sliderinactive');

        this.off(doc, 'mousemove', this.handleMouseMove);
        this.off(doc, 'mouseup', this.handleMouseUp);
        this.off(doc, 'touchmove', this.handleMouseMove);
        this.off(doc, 'touchend', this.handleMouseUp);
         this.player_.currentTime(this.newTime);
        this.setPosition(event.clientX);
        this.seekBarRect = undefined;  /**/
        if (this.videoWasPlaying) {
            SeekBarCustomComponent.silencePromise(this.player_.play());
        }

    }

    static silencePromise(value) {
        value.then(null, (e) => {});
    }

    setPosition(position) {
        console.log("setPosition", this.newTime);
        console.log("getCurrentTime_", this.getCurrentTime_());
        console.log("_________________");
        // if (this.seekBarRect === undefined) {
        //     this.seekBarRect = videojs.dom.getBoundingClientRect(this.bar.el_);
        // }
        this.bar.update(this.newTime, super.update());
        this.bar.el_.style.width =  Math.ceil(this._percentage(this.newTime, this.player_.duration())) + '%';

         // this.bar.el_.style.width = (position > videojs.dom.getBoundingClientRect(this.el()).width ? videojs.dom.getBoundingClientRect(this.el()).width : position - this.seekBarRect.left)+ 'px';

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
        'PlayProgressBarComponent'
    ],
    barName: 'PlayProgressBarComponent'
};
videojs.registerComponent('SeekBarCustomComponent', SeekBarCustomComponent);
