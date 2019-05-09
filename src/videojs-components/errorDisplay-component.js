const ErrorDisplay = videojs.getComponent('ErrorDisplay');
const ModalDialog = videojs.getComponent('ModalDialog');

export default class ErrorDisplayComponent extends ErrorDisplay {
    constructor(player, options) {
        super(player, options);
    }

    fillWith(content) {
        const contentEl = this.contentEl();
        const parentEl = contentEl.parentNode;
        const nextSiblingEl = contentEl.nextSibling;

        /**
         * Fired just before a `ModalDialog` is filled with content.
         *
         * @event ModalDialog#beforemodalfill
         * @type {EventTarget~Event}
         */
        this.trigger('beforemodalfill');
        this.hasBeenFilled_ = true;



        // Detach the content element from the DOM before performing
        // manipulation to avoid modifying the live DOM multiple times.
        parentEl.removeChild(contentEl);
        this.empty();
        console.log("error message", this.player().error().code);

        const textContainer = videojs.dom.createEl('div', {
            className: `error-display-text-content`
        }, {
            role: 'document'
        });
        let errorType = this.player().error().code === 6 ? 'DRM' : 'MEDIA';
        parentEl.classList.add(`modal-dialog-icon-${errorType}`);
        videojs.dom.insertContent(textContainer, content);
        videojs.dom.insertContent(contentEl, textContainer);
        /**
         * Fired just after a `ModalDialog` is filled with content.
         *
         * @event ModalDialog#modalfill
         * @type {EventTarget~Event}
         */
        this.trigger('modalfill');

        // Re-inject the re-filled content element.
        if (nextSiblingEl) {
            parentEl.insertBefore(contentEl, nextSiblingEl);
        } else {
            parentEl.appendChild(contentEl);
        }
    }

}
ErrorDisplayComponent.prototype.options_ = videojs.mergeOptions(ModalDialog.prototype.options_, {
    pauseOnOpen: false,
    fillAlways: true,
    temporary: false,
    uncloseable: true
});
videojs.registerComponent('ErrorDisplayComponent', ErrorDisplayComponent);
