// import videojs from '../../node_modules/video.js/dist/video.js'
const TimeTooltip = videojs.getComponent('TimeTooltip');

export class TimeTooltipComponent extends TimeTooltip {
    constructor(player, options, ready){
        super(player, options, ready);
        console.log("TimeTooltipComponent constructor");
    }

    update(seekBarRect, seekBarPoint, content) {
        super.update(seekBarRect, seekBarPoint, content);
    }

    updateTimeOnSeek(time) {
        videojs.dom.textContent(this.el_, time);
    }

    updateTime(seekBarRect, seekBarPoint, time, cb) {
        super.updateTime(seekBarRect, seekBarPoint, time, cb);
        console.log("updateTime", this);
    }

}

videojs.registerComponent('TimeTooltipComponent', TimeTooltipComponent);
