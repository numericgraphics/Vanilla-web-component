import videojs from '../../node_modules/video.js/dist/video.js'
const ProgressControl = videojs.getComponent('ProgressControl');

export class ProgressControlComponent extends ProgressControl {
    constructor(player, options){
        super(player, options);
    }

    handleMouseMove(event) {
        const seekBar = this.getChild('SeekBarCustomComponent');
        if (seekBar) {
            const mouseTimeDisplay = seekBar.getChild('mouseTimeDisplay');
            const seekBarEl = seekBar.el();
            const seekBarRect = videojs.dom.getBoundingClientRect(seekBarEl);
            let seekBarPoint = videojs.dom.getPointerPosition(seekBarEl, event).x;

            if (seekBarPoint > 1) {
                seekBarPoint = 1;
            } else if (seekBarPoint < 0) {
                seekBarPoint = 0;
            }

            if (mouseTimeDisplay) {
                mouseTimeDisplay.update(seekBarRect, seekBarPoint);
            }
        }
    }

    handleMouseSeek(event) {
        const seekBar = this.getChild('SeekBarCustomComponent');

        if (seekBar) {
            seekBar.handleMouseMove(event);
        }
    }

    handleMouseDown(event) {
        const doc = this.el_.ownerDocument;
        const seekBar = this.getChild('SeekBarCustomComponent');

        if (seekBar) {
            seekBar.handleMouseDown(event);
        }

        this.on(doc, 'mousemove', this.throttledHandleMouseSeek);
        this.on(doc, 'touchmove', this.throttledHandleMouseSeek);
        this.on(doc, 'mouseup', this.handleMouseUp);
        this.on(doc, 'touchend', this.handleMouseUp);
    }

    handleMouseUp(event) {
        const doc = this.el_.ownerDocument;
        const seekBar = this.getChild('SeekBarCustomComponent');

        if (seekBar) {
            seekBar.handleMouseUp(event);
        }

        this.off(doc, 'mousemove', this.throttledHandleMouseSeek);
        this.off(doc, 'touchmove', this.throttledHandleMouseSeek);
        this.off(doc, 'mouseup', this.handleMouseUp);
        this.off(doc, 'touchend', this.handleMouseUp);
    }

}

ProgressControl.prototype.options_ = {
    children: [
        'SeekBarCustomComponent'
    ]
};

videojs.registerComponent('ProgressControlComponent', ProgressControlComponent);
