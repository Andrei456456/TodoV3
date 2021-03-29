export class Task {
    constructor(id, title, date, isDone,) {
        this._id = id;
        this._title = title;
        this._date = date;
        this._isDone = isDone;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get date() {
        return this._date;
    }
    get isDone() {
        return this._isDone;
    }
    toggle() {
        return this._isDone = !this._isDone;
    }

    static parse({ id, title, date, isDone }) {
        return new Task(
            id,
            title,
            date,
            isDone
        );
    }

    static deparse({ id, title, date, isDone }) {
        return ({//JSON.stringify({ //убрал в другое место
            id,
            title,
            date,
            isDone,
        });
    }
}
