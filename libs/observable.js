export class Observable {
    constructor() {
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
}
