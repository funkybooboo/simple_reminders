export default class Reminder {

    readonly id: number;
    private _isComplete: boolean;

    constructor(
        public title: string
    ) {
        this.id = Date.now();
        this._isComplete = false;
    }
    done() {
        this._isComplete = true;
    }

    get isComplete() {
        return this._isComplete;
    }
}