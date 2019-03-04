class TestComponent extends HTMLElement {
    constructor () {
        super();
        console.log('TestComponent');
    }

    getComponent () {
        console.log('TestComponent getComponent');
    }
}


customElements.define('test-component', TestComponent)
