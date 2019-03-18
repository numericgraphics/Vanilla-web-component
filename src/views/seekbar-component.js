import videojs from '../../node_modules/video.js/dist/video.js'
const SeekBar = videojs.getComponent('SeekBar');
// const PlayProgressBar = videojs.getComponent('PlayProgressBar');
// const Slider = videojs.getComponent('Slider');


export class SeekbarComponent extends SeekBar {

    constructor(player, options) {
        super(player, options);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.newTime = 0;
        this.setEventHandlers_();
    }

    handleMouseMove(event) {
        console.log("handleMouseMove", event);
        if (!videojs.dom.isSingleLeftClick(event)) {
            return;
        }
        const distance = this.calculateDistance(event);
        const liveTracker = this.player_.liveTracker;

        if (!liveTracker || !liveTracker.isLive()) {
            this.newTime = distance * this.player_.duration();

            // Don't let video end while scrubbing.
            if (this.newTime === this.player_.duration()) {
                this.newTime = this.newTime - 0.1;
            }
        } else {
            const seekableStart = liveTracker.seekableStart();
            const seekableEnd = liveTracker.liveCurrentTime();

            this.newTime = seekableStart + (distance * liveTracker.liveWindow());

            // Don't let video end while scrubbing.
            if (this.newTime >= seekableEnd) {
                this.newTime = seekableEnd;
            }

            // Compensate for precision differences so that currentTime is not less
            // than seekable start
            if (this.newTime <= seekableStart) {
                this.newTime = seekableStart + 0.1;
            }

            // On android seekableEnd can be Infinity sometimes,
            // this will cause newTime to be Infinity, which is
            // not a valid currentTime.
            if (this.newTime === Infinity) {
                return;
            }
        }



        // Set new time (tell player to seek to new time)
        // this.player_.currentTime(this.newTime);
    }

    isPromise(value) {
        return value !== undefined && value !== null && typeof value.then === 'function';
    }

    silencePromise(value) {
        if (this.isPromise(value)) {
            value.then(null, (e) => {
            });
        }
    }

    // handleMouseUp(event) {
    //     super.handleMouseUp(event);
    //
    //     // Stop event propagation to prevent double fire in progress-control.js
    //     if (event) {
    //         event.stopPropagation();
    //     }
    //     this.player_.scrubbing(false);
    //
    //     this.player_.currentTime(this.newTime);
    //
    //     /**
    //      * Trigger timeupdate because we're done seeking and the time has changed.
    //      * This is particularly useful for if the player is paused to time the time displays.
    //      *
    //      * @event Tech#timeupdate
    //      * @type {EventTarget~Event}
    //      */
    //     this.player_.trigger({ type: 'timeupdate', target: this, manuallyTriggered: true });
    //     if (this.videoWasPlaying) {
    //         this.silencePromise(this.player_.play());
    //     }
    // }

    // constructor (player, options) {
    //
    //     super(player, options);
    //     let element = this.el();
    //
    //     let progressElement = document.createElement("DIV");
    //     progressElement.classList.add("progressFake");
    //     progressElement.classList.add("vertical-center");
    //
    //     let progressFakeElement = document.createElement("DIV");
    //     progressFakeElement.classList.add("progress");
    //     progressFakeElement.classList.add("vertical-center");
    //
    //     this.loadElement = document.createElement("DIV");
    //     this.loadElement.classList.add("vjs-load-progress");
    //     this.loadElement.classList.add("vertical-center");
    //
    //     this.playElement = document.createElement("DIV");
    //     this.playElement.classList.add("vjs-play-progress");
    //     this.playElement.setAttribute("id", "playProgress");
    //     this.playElement.classList.add("vertical-center");
    //
    //     // element.appendChild(progressFakeElement);
    //     // element.appendChild(progressElement);
    //     // element.appendChild(this.loadElement);
    //     // element.appendChild(this.playElement);
    //
    //     let progressBar = document.querySelector("#progressBar");
    //     let playProgress = document.querySelector("#playProgress");
    //
    //     console.log("constructor playerEvent", this);
    //
    //     // this.on(this.player_, 'timeupdate', this.update);
    //     // this.on(this.player_, 'progress', this.progressUpdate);
    //
    //     // let active = false;
    //     // let initialX;
    //     // let dragItemWidth;
    //     //
    //     // dragStart = dragStart.bind(this);
    //     // dragEnd = dragEnd.bind(this);
    //     // drag = drag.bind(this);
    //     // this.update = this.update.bind(this);
    //     //
    //     // console.log("initialX", initialX);
    //     // element.addEventListener("mousedown", dragStart, false);
    //     // element.addEventListener("mouseup", dragEnd, false);
    //     // element.addEventListener("mousemove", drag, false);
    //     //
    //     //
    //     // function dragStart(e) {
    //     //     active = true;
    //     //     setWidth(e);
    //     // }
    //     //
    //     // function dragEnd(e) {
    //     //     active = false;
    //     // }
    //     //
    //     // function drag(e) {
    //     //     if (active) {
    //     //         setWidth(e);
    //     //     }
    //     // }
    //     //
    //     // setWidth = setWidth.bind(this);
    //     //
    //     // function setWidth(e){
    //     //     if (initialX === undefined){
    //     //         initialX = this.playElement.getBoundingClientRect().left;
    //     //     }
    //     //     if (dragItemWidth === undefined){
    //     //         dragItemWidth = this.playElement.parentElement.getBoundingClientRect().width;
    //     //     }
    //     //      this.playElement.style.width = e.clientX - initialX > dragItemWidth ? dragItemWidth : e.clientX - initialX +'px';
    //     // }
    // }

    // _percentage = function(time, duration) {
    //     return (duration) ? (time / duration) * 100 : 0;
    // }

    // getCurrentTime_() {
    //     return (this.player_.scrubbing()) ?
    //         this.player_.getCache().currentTime :
    //         this.player_.currentTime();
    // }
    //
    // getPercent() {
    //     const currentTime = this.getCurrentTime_();
    //     let percent;
    //     const liveTracker = this.player_.liveTracker;
    //
    //     if (liveTracker && liveTracker.isLive()) {
    //         percent = (currentTime - liveTracker.seekableStart()) / liveTracker.liveWindow();
    //
    //         // prevent the percent from changing at the live edge
    //         if (liveTracker.atLiveEdge()) {
    //             percent = 1;
    //         }
    //     } else {
    //         percent = currentTime / this.player_.duration();
    //     }
    //
    //     return percent >= 1 ? 1 : (percent || 0);
    // }

    // update(seekBarRect, seekBarPoint) {
        // const timeTooltip = this.getChild('timeTooltip');
        //
        // if (!timeTooltip) {
        //     return;
        // }

        // const time = (this.player_.scrubbing()) ?
        //     this.player_.getCache().currentTime :
        //     this.player_.currentTime();
        //
        // timeTooltip.updateTime(seekBarRect, seekBarPoint, time);
    // }
    // progressUpdate(event){
    //     console.log("progressUpdate", this.loadElement);
    // }

    // update(){
        // let progress = this.getPercent();
        // console.log("update", this.playElement);
        // console.log("currentTime", this.player().currentTime());
        // console.log("duration", this.player().duration());
        // this.playElement.style.width = this._percentage(this.player().currentTime() ,this.player().duration()) + "px";

        // console.log("duration", this._percentage(this.player().currentTime() ,this.player().duration()));


        // console.log("update", videojs.dom.getBoundingClientRect(this.el_));
    // }

    // ready(){
    //     console.log("ready");
    // }
    //
    // createEl(){
    //     console.log("createEl", videojs.dom);
    //     return videojs.dom.createEl('div', {
    //         className: 'vjs-srg-seek-bar vjs-control'
    //     });
    // }
}
