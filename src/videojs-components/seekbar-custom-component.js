// import videojs from '../../node_modules/video.js/dist/video.js'
import {detectmob} from '../utils/userAgentDetection.js'

const SeekBar = videojs.getComponent('SeekBar');

export class SeekBarCustomComponent extends SeekBar {

    constructor(player, options) {
        super(player, options);

        this.parent = Object.getPrototypeOf(SeekBar);

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);

        this.newTime = undefined;
        this.position = undefined;

        player.on('seeked', (evt) => {
            this.bar.timeTooltip.show();
        });
    }

    update(event) {
        super.update();
    }

    getCurrentTime_() {
        return (this.player_.scrubbing()) ?
            this.player_.getCache().currentTime :
            this.player_.currentTime();
    }

    handleMouseDown(event) {
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
        if (detectmob()) {
            this.on(doc, 'touchmove', this.handleMouseMove);
            this.on(doc, 'touchend', this.handleMouseUp);
        }

        this._calculateNewTime(event);
        this.player_.currentTime(this.newTime);

        this.videoWasPlaying = !this.player_.paused();
        if (this.videoWasPlaying) {
            this.player_.pause();
        }
    }

    handleMouseMove(event) {
        this.bar.timeTooltip.hide();
        this.player_.currentTime(this.newTime);
        this._calculateNewTime(event);
        this._setPosition();
    }

    handleMouseUp(event) {
        if (event) {
            event.stopPropagation();
        }
        const doc = this.bar.el_.ownerDocument;

        videojs.dom.unblockTextSelection();
        this.removeClass('vjs-sliding');
        this.trigger('sliderinactive');

        this.off(doc, 'mousemove', this.handleMouseMove);
        this.off(doc, 'mouseup', this.handleMouseUp);
        this.off(doc, 'touchmove', this.handleMouseMove);
        this.off(doc, 'touchend', this.handleMouseUp);
        this.player_.currentTime(this.newTime);
        this._setPosition();

        if (this.videoWasPlaying) {
            this._silencePromise(this.player_.play());
        }
        this.player_.scrubbing(false);
    }

    _silencePromise(value) {
        value.then(null, (e) => {
        });
    }

    _setPosition() {
        this.bar.update(this.newTime, super.update());
        let duration = this.player_.duration() === Infinity ? this.player_.liveTracker.liveWindow() : this.player_.duration();
        console.log("position", this._percentage(this.newTime, duration) );
        this.bar.el_.style.width = this._percentage(this.newTime, duration) + '%';
    }

    _calculateNewTime(event) {
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

    _percentage(time, duration) {
        return (time / duration) * 100;
    }


}
SeekBarCustomComponent.prototype.playerEvent = 'timeupdate';
videojs.registerComponent('SeekBarCustomComponent', SeekBarCustomComponent);
