// import videojs from '../../node_modules/video.js/dist/video.js'
const CurrentTimeDisplay = videojs.getComponent('CurrentTimeDisplay');

export default class CurrentTimeDisplayComponent extends CurrentTimeDisplay {
    constructor(player, options) {
        super(player, options);
        console.log("CurrentTimeDisplayComponent constructor", this.player_.liveTracker);
    }

    updateContent(event) {
        // Allows for smooth scrubbing, when player can't keep up.

        let time = (this.player_.scrubbing()) ? this.player_.getCache().currentTime : this.player_.currentTime();
        let currentHours = new Date().getHours()*3600 + new Date().getMinutes()*60 + new Date().getSeconds();
        if(this.player_.liveTracker){
             console.log("CurrentTimeDisplayComponent liveWindow", (Date.now() - (this.player_.liveTracker.liveWindow() - this.player_.currentTime())) );
            time = currentHours - (( (this.player_.scrubbing()) ? this.player_.getCache().currentTime : this.player_.currentTime()) - this.player_.liveTracker.liveWindow());
        }

        this.updateFormattedTime_(time);
    }
}

videojs.registerComponent('CurrentTimeDisplayComponent', CurrentTimeDisplayComponent);
