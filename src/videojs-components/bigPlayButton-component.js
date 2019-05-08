const BigPlayButton = videojs.getComponent('BigPlayButton');

export default class BigPlayButtonComponent extends BigPlayButton {
    constructor(player, options) {
        super(player, options);
    }

    handleClick(event) {
        console.log("handleClick");
        // this.el().classList.add('vjs-big-play-button-focused');
        super.handleClick(event);
    }

    handleMouseDown(event) {
        console.log("handleMouseDown");
        super.handleMouseDown(event);
    }
}
BigPlayButtonComponent.prototype.controlText_ = 'Play Video';
videojs.registerComponent('BigPlayButtonComponent', BigPlayButtonComponent);
