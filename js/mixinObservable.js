export const mixinObservable = Base => class extends Base {
    constructor() {
        console.log("mixinObservable constructor");
        super();
        this.observers = [];
    }

    subscribe(fun) {
        console.log("subscribe", fun);
        this.observers.push(fun);
    }

    unsubscribe(fun) {
        this.observers = this.observers.filter(subscriber => subscriber !== fun);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
};
