
const seekToLive = videojs.getComponent('seekToLive');
const Component = videojs.getComponent('Component');

class SeekToLiveComponent extends seekToLive {

    constructor(player, options) {
        super(player, options);

        this.updateLiveEdgeStatus();

        this.on(this.player_, 'durationchange', ()=>{
            if (this.player_.liveTracker) {
                this.on(this.player_.liveTracker, 'liveedgechange', this.updateLiveEdgeStatus);
            }
        });


    }

    createEl() {
        const el = super.createEl('button', {
            className: 'vjs-seek-to-live-control vjs-control'
        });

        this.textEl_ = videojs.dom.createEl('span', {
            className: 'vjs-seek-to-live-text',
            innerHTML: this.localize('LIVE')
        }, {
            'aria-hidden': 'true'
        });

        el.appendChild(this.textEl_);
        return el;
    }

    updateLiveEdgeStatus(e) {
        // default to live edge
        if (!this.player_.liveTracker || this.player_.liveTracker.atLiveEdge()) {
            this.setAttribute('aria-disabled', true);
            this.addClass('vjs-at-live-edge');
            this.controlText('Seek to live, currently playing live');
        } else {
            this.setAttribute('aria-disabled', false);
            this.removeClass('vjs-at-live-edge');
            this.controlText('Seek to live, currently behind live');
        }
    }

    handleClick() {
        this.player_.liveTracker.seekToLiveEdge();
    }

    dispose() {
        if (this.player_.liveTracker) {
            this.off(this.player_.liveTracker, 'liveedgechange', this.updateLiveEdgeStatus);
        }
        this.textEl_ = null;

        super.dispose();
    }
}

SeekToLiveComponent.prototype.controlText_ = 'Seek to live, currently playing live';

Component.registerComponent('SeekToLiveComponent', SeekToLiveComponent);
export default SeekToLiveComponent;
