const Component = videojs.getComponent('Component');
const Button = videojs.getComponent('Button');

class SRGSSRButtonComponent extends Button {

    constructor(player, options) {
        super(player, options);
        this.selectedBU = options.playerOptions.bu;
        console.log("SRGSSRButtonComponent", this.selectedBU);
        console.log("SRGSSRButtonComponent", options.playerOptions);
    }


    /***** videojs css logo bu id
     // logo-play-rts: 'f121',
     // logo-play-rtr: 'f122',
     // logo-play-rsi: 'f123',
     // logo-play-srf: 'f124',
     // logo-play-swi: 'f125',
     ********************************/
    createEl(tag, props = {}, attributes = {}) {
        tag = 'button';

        let cssClass = ` ${this.buildCSSClass()} vjs-srgssr-button vjs-srgssr-rts`;
        console.log("createEl", cssClass);

        props = Object.assign({
            innerHTML: '<span aria-hidden="true" class="vjs-icon-placeholder"></span>',
            className: cssClass
        }, props);

        // Add attributes for button element
        attributes = Object.assign({

            // Necessary since the default button type is "submit"
            type: 'button'
        }, attributes);

        const el = Component.prototype.createEl.call(this, tag, props, attributes);

        this.createControlTextEl(el);

        return el;
    }

}
Component.registerComponent('SRGSSRButtonComponent', SRGSSRButtonComponent);
export default SRGSSRButtonComponent;
