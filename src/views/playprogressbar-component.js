import videojs from '../../node_modules/video.js/dist/video.js'
import {SeekBarCustomComponent} from "./seekbar-custom-component";
const Component = videojs.getComponent('Component');

export class PlayProgressBarComponent extends Component {

    constructor(player, options, ready){
        super(player, options, ready);
    }

    createEl() {
        return super.createEl('div', {
            className: 'vjs-play-progress vjs-slider-bar'
        }, {
            'aria-hidden': 'true'
        });
    }

    update(seekBarRect, seekBarPoint) {
        // console.log("PlayProgressBarComponent", this.el_.style.width);
        const timeTooltip = this.getChild('timeTooltip');

        if (!timeTooltip) {
            return;
        }

        const time = (this.player_.scrubbing()) ?
            this.player_.getCache().currentTime :
            this.player_.currentTime();

        timeTooltip.updateTime(seekBarRect, seekBarPoint, time);
    }
}
videojs.registerComponent('PlayProgressBarComponent', PlayProgressBarComponent);
