
export class AbstractStore {

    constructor() {
        this._timeWait = 1;
    }

    simulateWaiting(name) {

        const timeWait = this._timeWait;
        return new Promise (function (resolve) {
            setTimeout(() => {
                resolve();// (console.log(`abstract ${name}`));
            }, timeWait);
        });
    }

    checkStore() {
        const name = 'checkStore';
        // console.log(`wait ${name}`);
        return this.simulateWaiting(name);
    }

    getBaseTasks() {
        const name = 'getBaseTasks';
        // console.log(`wait ${name}`);
        return this.simulateWaiting(name);
    }

    addTask() {
        const name = 'addTask';
        // console.log(`wait ${name}`);
        return this.simulateWaiting(name);
    }

    getLastTask() {  
        const name = 'getLastTask';
        // console.log(`wait ${name}`);
        return this.simulateWaiting(name);
    }

    removeTask() {
        const name = 'removeTask';
        // console.log(`wait ${name}`);
        return this.simulateWaiting(name);
    }

    updateTask() {
        const name = 'updateTask';
        // console.log(`wait ${name}`);
        return this.simulateWaiting(name);
    }
}

