const CurrentTimeDisplay = videojs.getComponent('CurrentTimeDisplay');

export default class CurrentTimeDisplayComponent extends CurrentTimeDisplay {
    constructor(player, options) {
        super(player, options);
        console.log("CurrentTimeDisplayComponent constructor", this.player_.liveTracker);
    }

    updateContent(event) {
        let time = (this.player_.scrubbing()) ? this.player_.getCache().currentTime : this.player_.currentTime();
        if(this.player_.liveTracker){
            let date = new Date();
            let currentHour = date.getHours()*3600 + date.getMinutes()*60 + date.getSeconds();
            let DVRPosition = (this.player_.liveTracker.liveWindow() - this.player_.currentTime());
            time = currentHour - DVRPosition;
        }
        this.updateFormattedTime_(time);
    }
}

videojs.registerComponent('CurrentTimeDisplayComponent', CurrentTimeDisplayComponent);
