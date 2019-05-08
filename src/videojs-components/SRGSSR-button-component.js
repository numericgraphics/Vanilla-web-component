const Component = videojs.getComponent('Component');
const Button = videojs.getComponent('Button');

class SRGSSRButtonComponent extends Button {

    constructor(player, options) {
        super(player, options);
        this.selectedBU = options.playerOptions.bu;
        this.el().classList.add(`vjs-srgssr-${this.selectedBU}`);
    }

    createEl(tag, props = {}, attributes = {}) {
        tag = 'button';

        props = Object.assign({
            innerHTML: '<span aria-hidden="true" class="vjs-icon-placeholder"></span>',
            className: `${this.buildCSSClass()} vjs-srgssr-button`,
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
