import videojs from '../../node_modules/video.js/dist/video.js'
const SeekBar = videojs.getComponent('SeekBar');
const Slider = videojs.getComponent('Slider');
const Component = videojs.getComponent('Component');
const ProgressControl = videojs.getComponent('ProgressControl');
const STEP_SECONDS = 5;
const PAGE_KEY_MULTIPLIER = 12;
const UPDATE_REFRESH_INTERVAL = 30;
/*
export class SeekBarCustom2Component extends SeekBar {

    constructor(player, options) {
        super(player, options);
        // Component.apply(this, arguments);
    }
}
*/
class SeekBarCustom2Component extends Slider {

    /**
     * Creates an instance of this class.
     *
     * @param {Player} player
     *        The `Player` that this class should be attached to.
     *
     * @param {Object} [options]
     *        The key/value store of player options.
     */
    constructor(player, options) {
        super(player, options);
        this.setEventHandlers_();
        console.log("SeekBarCustom2Component constructor");
        this._guid = 1;
    }

    newGUID() {
        return this._guid++;
    }

    _bind(context, fn, uid) {
        // Make sure the function has a unique ID
        if (!fn.guid) {
            fn.guid = this.newGUID();
        }

        // Create the new function that changes the context
        const bound = function() {
            return fn.apply(context, arguments);
        };

        // Allow for the ability to individualize this function
        // Needed in the case where multiple objects might share the same prototype
        // IF both items add an event listener with the same function, then you try to remove just one
        // it will remove both because they both have the same guid.
        // when using this, you need to use the bind method when you remove the listener as well.
        // currently used in text tracks
        bound.guid = (uid) ? uid + '_' + fn.guid : fn.guid;

        return bound;
    };

    _throttle(fn, wait) {
        let last = Date.now();

        const throttled = function(...args) {
            const now = Date.now();

            if (now - last >= wait) {
                fn(...args);
                last = now;
            }
        };

        return throttled;
    };

    /**
     * Sets the event handlers
     *
     * @private
     */
    setEventHandlers_() {
        this.update = this._throttle(this._bind(this, this.update), UPDATE_REFRESH_INTERVAL);

        this.on(this.player_, 'timeupdate', this.update);
        this.on(this.player_, 'ended', this.handleEnded);
        this.on(this.player_, 'durationchange', this.update);
        if (this.player_.liveTracker) {
            this.on(this.player_.liveTracker, 'liveedgechange', this.update);
        }

        // when playing, let's ensure we smoothly update the play progress bar
        // via an interval
        this.updateInterval = null;

        this.on(this.player_, ['playing'], () => {
            this.clearInterval(this.updateInterval);

            this.updateInterval = this.setInterval(() =>{
                this.requestAnimationFrame(() => {
                    this.update();
                });
            }, UPDATE_REFRESH_INTERVAL);
        });

        this.on(this.player_, ['ended', 'pause', 'waiting'], (e) => {
            if (this.player_.liveTracker && this.player_.liveTracker.isLive() && e.type !== 'ended') {
                return;
            }

            this.clearInterval(this.updateInterval);
        });

        this.on(this.player_, ['timeupdate', 'ended'], this.update);
    }

    /**
     * Create the `Component`'s DOM element
     *
     * @return {Element}
     *         The element that was created.
     */
    createEl() {
        return super.createEl('div', {
            className: 'vjs-progress-holder'
        }, {
            'aria-label': this.localize('Progress Bar')
        });
    }

    /**
     * This function updates the play progress bar and accessibility
     * attributes to whatever is passed in.
     *
     * @param {number} currentTime
     *        The currentTime value that should be used for accessibility
     *
     * @param {number} percent
     *        The percentage as a decimal that the bar should be filled from 0-1.
     *
     * @private
     */
    update_(currentTime, percent) {
        const liveTracker = this.player_.liveTracker;
        let duration = this.player_.duration();

        if (liveTracker && liveTracker.isLive()) {
            duration = this.player_.liveTracker.liveCurrentTime();
        }

        // machine readable value of progress bar (percentage complete)
        this.el_.setAttribute('aria-valuenow', (percent * 100).toFixed(2));

        // human readable value of progress bar (time complete)
        this.el_.setAttribute(
            'aria-valuetext',
            this.localize(
                'progress bar timing: currentTime={1} duration={2}',
                [videojs.formatTime(currentTime, duration),
                    videojs.formatTime(duration, duration)],
                '{1} of {2}'
            )
        );

        // Update the `PlayProgressBar`.
        this.bar.update(videojs.dom.getBoundingClientRect(this.el_), percent);
    }

    /**
     * Update the seek bar's UI.
     *
     * @param {EventTarget~Event} [event]
     *        The `timeupdate` or `ended` event that caused this to run.
     *
     * @listens Player#timeupdate
     *
     * @return {number}
     *          The current percent at a number from 0-1
     */
    update(event) {
        const percent = super.update();

        this.update_(this.getCurrentTime_(), percent);
        return percent;
    }

    /**
     * Get the value of current time but allows for smooth scrubbing,
     * when player can't keep up.
     *
     * @return {number}
     *         The current time value to display
     *
     * @private
     */
    getCurrentTime_() {
        return (this.player_.scrubbing()) ?
            this.player_.getCache().currentTime :
            this.player_.currentTime();
    }

    /**
     * We want the seek bar to be full on ended
     * no matter what the actual internal values are. so we force it.
     *
     * @param {EventTarget~Event} [event]
     *        The `timeupdate` or `ended` event that caused this to run.
     *
     * @listens Player#ended
     */
    handleEnded(event) {
        this.update_(this.player_.duration(), 1);
    }

    /**
     * Get the percentage of media played so far.
     *
     * @return {number}
     *         The percentage of media played so far (0 to 1).
     */
    getPercent() {
        const currentTime = this.getCurrentTime_();
        let percent;
        const liveTracker = this.player_.liveTracker;

        if (liveTracker && liveTracker.isLive()) {
            percent = (currentTime - liveTracker.seekableStart()) / liveTracker.liveWindow();

            // prevent the percent from changing at the live edge
            if (liveTracker.atLiveEdge()) {
                percent = 1;
            }
        } else {
            percent = currentTime / this.player_.duration();
        }

        return percent >= 1 ? 1 : (percent || 0);
    }

    /**
     * Handle mouse down on seek bar
     *
     * @param {EventTarget~Event} event
     *        The `mousedown` event that caused this to run.
     *
     * @listens mousedown
     */
    handleMouseDown(event) {
        if (!videojs.dom.isSingleLeftClick(event)) {
            return;
        }

        // Stop event propagation to prevent double fire in progress-control.js
        event.stopPropagation();
        this.player_.scrubbing(true);

        this.videoWasPlaying = !this.player_.paused();
        this.player_.pause();

        super.handleMouseDown(event);
    }

    /**
     * Handle mouse move on seek bar
     *
     * @param {EventTarget~Event} event
     *        The `mousemove` event that caused this to run.
     *
     * @listens mousemove
     */
    handleMouseMove(event) {
        if (!videojs.dom.isSingleLeftClick(event)) {
            return;
        }
        let newTime;
        const distance = this.calculateDistance(event);
        const liveTracker = this.player_.liveTracker;

        if (!liveTracker || !liveTracker.isLive()) {
            newTime = distance * this.player_.duration();

            // Don't let video end while scrubbing.
            if (newTime === this.player_.duration()) {
                newTime = newTime - 0.1;
            }
        } else {
            const seekableStart = liveTracker.seekableStart();
            const seekableEnd = liveTracker.liveCurrentTime();

            newTime = seekableStart + (distance * liveTracker.liveWindow());

            // Don't let video end while scrubbing.
            if (newTime >= seekableEnd) {
                newTime = seekableEnd;
            }

            // Compensate for precision differences so that currentTime is not less
            // than seekable start
            if (newTime <= seekableStart) {
                newTime = seekableStart + 0.1;
            }

            // On android seekableEnd can be Infinity sometimes,
            // this will cause newTime to be Infinity, which is
            // not a valid currentTime.
            if (newTime === Infinity) {
                return;
            }
        }

        // Set new time (tell player to seek to new time)
        this.player_.currentTime(newTime);
    }

    enable() {
        super.enable();
        const mouseTimeDisplay = this.getChild('mouseTimeDisplay');

        if (!mouseTimeDisplay) {
            return;
        }

        mouseTimeDisplay.show();
    }

    disable() {
        super.disable();
        const mouseTimeDisplay = this.getChild('mouseTimeDisplay');

        if (!mouseTimeDisplay) {
            return;
        }

        mouseTimeDisplay.hide();
    }

    /**
     * Handle mouse up on seek bar
     *
     * @param {EventTarget~Event} event
     *        The `mouseup` event that caused this to run.
     *
     * @listens mouseup
     */
    handleMouseUp(event) {
        super.handleMouseUp(event);

        // Stop event propagation to prevent double fire in progress-control.js
        if (event) {
            event.stopPropagation();
        }
        this.player_.scrubbing(false);

        /**
         * Trigger timeupdate because we're done seeking and the time has changed.
         * This is particularly useful for if the player is paused to time the time displays.
         *
         * @event Tech#timeupdate
         * @type {EventTarget~Event}
         */
        this.player_.trigger({ type: 'timeupdate', target: this, manuallyTriggered: true });
        if (this.videoWasPlaying) {
            SeekBarCustom2Component.silencePromise(this.player_.play());
        }
    }

    static silencePromise(value) {
        value.then(null, (e) => {});
    }

    /**
     * Move more quickly fast forward for keyboard-only users
     */
    stepForward() {
        this.player_.currentTime(this.player_.currentTime() + STEP_SECONDS);
    }

    /**
     * Move more quickly rewind for keyboard-only users
     */
    stepBack() {
        this.player_.currentTime(this.player_.currentTime() - STEP_SECONDS);
    }

    /**
     * Toggles the playback state of the player
     * This gets called when enter or space is used on the seekbar
     *
     * @param {EventTarget~Event} event
     *        The `keydown` event that caused this function to be called
     *
     */
    handleAction(event) {
        if (this.player_.paused()) {
            this.player_.play();
        } else {
            this.player_.pause();
        }
    }

    /**
     * Called when this SeekBar has focus and a key gets pressed down.
     * Supports the following keys:
     *
     *   Space or Enter key fire a click event
     *   Home key moves to start of the timeline
     *   End key moves to end of the timeline
     *   Digit "0" through "9" keys move to 0%, 10% ... 80%, 90% of the timeline
     *   PageDown key moves back a larger step than ArrowDown
     *   PageUp key moves forward a large step
     *
     * @param {EventTarget~Event} event
     *        The `keydown` event that caused this function to be called.
     *
     * @listens keydown
     */
    handleKeyPress(event) {

    }
}

/**
 * Default options for the `SeekBar`
 *
 * @type {Object}
 * @private
 */
SeekBarCustom2Component.prototype.options_ = {
    children: [
        'loadProgressBar',
        'PlayProgressBar'
    ],
    barName: 'playProgressBar'
};

// MouseTimeDisplay tooltips should not be added to a player on mobile devices

SeekBarCustom2Component.prototype.options_.children.splice(1, 0, 'mouseTimeDisplay');


/**
 * Call the update event for this Slider when this event happens on the player.
 *
 * @type {string}
 */
SeekBarCustom2Component.prototype.playerEvent = 'timeupdate';

videojs.registerComponent('SeekBarCustom2Component', SeekBarCustom2Component);
export default SeekBarCustom2Component;
