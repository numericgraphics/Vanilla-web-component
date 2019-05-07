const CurrentTimeDisplay = videojs.getComponent('CurrentTimeDisplay');

export default class CurrentTimeDisplayComponent extends CurrentTimeDisplay {
    constructor(player, options) {
        super(player, options);

    }

    updateContent(event) {
        let time = (this.player_.scrubbing()) ? this.player_.getCache().currentTime : this.player_.currentTime();
        if(this.player_.liveTracker){

            const seekBarPoint = this.player_.ControlBar.ProgressControlComponent.SeekBarCustomComponent.getPercent();
            const liveWindow = this.player_.liveTracker.liveWindow();
            const secondsBehind = liveWindow - (seekBarPoint * liveWindow);

            let date = new Date();
            let currentHour = date.getHours()*3600 + date.getMinutes()*60 + date.getSeconds();
            const DVRPosition = (this.player_.liveTracker.liveWindow() - secondsBehind);
            time = currentHour - secondsBehind;
        }
        this.updateFormattedTime_(time);
    }
}

videojs.registerComponent('CurrentTimeDisplayComponent', CurrentTimeDisplayComponent);
