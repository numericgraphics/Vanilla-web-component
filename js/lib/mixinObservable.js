export const mixinObservable = Base => class extends Base {
    constructor() {
        console.log("mixinObservable constructor");
        super();
        this.observers = [];
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

    setEventsManager(eventManager) {
        console.log("setEventsManager", eventManager);
        this.eventManager = eventManager;
    }
};
