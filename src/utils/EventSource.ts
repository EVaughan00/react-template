export class EventObserver<T = any> {
    public simple: boolean = false;
    private _onUpdate: (event: T) => void = () => {};

    constructor(public id: string) {}

    public onUpdate(handler: (event: T) => void ) {
        this._onUpdate = handler;
    }

    public update(event: T) {
        if (this._onUpdate)
            this._onUpdate(event);
    }
}

export class EventSource<T = any> {
    private _observers: EventObserver<T>[];

    constructor() {
        this._observers = [];
    }

    public addObserver(observer: EventObserver<T>) {
        this._observers.push(observer);
    }

    public removeObserver(id: string) {
        this._observers = this._observers.filter(o => o.id != id);
    }

    public notify(event: T) {
        this._observers.forEach(observer => observer.update(event));
    }
}