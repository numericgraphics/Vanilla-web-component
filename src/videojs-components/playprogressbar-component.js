// import videojs from '../../node_modules/video.js/dist/video.js'
import {TimeTooltipComponent} from "./timeTooltip-component.js";
const Component = videojs.getComponent('Component');

export class PlayProgressBarComponent extends Component {

    // constructor(player, options, ready){
    //     super(player, options, ready);
    // }

    createEl() {
        return super.createEl('div', {
            className: 'vjs-play-progress vjs-slider-bar'
        }, {
            'aria-hidden': 'true'
        });
    }

    update(seekBarRect, seekBarPoint) {

        const timeTooltip = this.getChild('TimeTooltipComponent');
        if (!timeTooltip) {
            return;
        }

        const time = (this.player_.scrubbing()) ?
            this.player_.getCache().currentTime :
            this.player_.currentTime();

        timeTooltip.updateTime(seekBarRect, seekBarPoint, time);
    }
}
PlayProgressBarComponent.prototype.options_ = {
    children: []
};

// Time tooltips should not be added to a player on mobile devices
if (!videojs.IS_IOS && !videojs.IS_ANDROID) {
    PlayProgressBarComponent.prototype.options_.children.push('TimeTooltipComponent');
}
videojs.registerComponent('PlayProgressBarComponent', PlayProgressBarComponent);
