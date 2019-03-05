export const mixinPubSub = Base => class extends Base {

    constructor() {
        super();
        this.events = {};
        this.observers = [];
    }

    subscribeEvent(event, callback) {
        let self = this;
        if(!self.events.hasOwnProperty(event)) {
            self.events[event] = [];
        }

        return self.events[event].push(callback);
    }

    publishEvent(event, data = {}) {
        let self = this;

        if(!self.events.hasOwnProperty(event)) {
            return [];
        }

        return self.events[event].map(callback => callback(data));
    }

    subscribe(fun) {
        this.observers.push(fun);
    }

    unsubscribe(fun) {
        this.observers = this.observers.filter(subscriber => subscriber !== fun);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
};
