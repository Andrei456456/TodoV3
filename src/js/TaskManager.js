import { Task } from "./Task.js";

export class TaskManager {
    constructor(store) {
        this._store = store;
    }

    checkStore() {
        return this._store.checkStore();
    }

    getStore() {
        return this._store.getBaseTasks();
    }

    async createTask(title, date) {
       
        this.id = `task${Date.now()}`;
        const newTask = Task.deparse({
            id: this.id,
            title: title,
            date: date,
            isDone: false
        });
        console.log(newTask);
        await this._store.addTask(newTask);
    }

    getLastTask() {
        return this._store.getLastTask();
    }

    async deleteTask(id) {
        return await this._store.removeTask(id);
    }

    toggleTask(id) { 
       return this._store.updateTask(id);
    }
}