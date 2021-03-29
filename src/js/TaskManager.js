import { Task } from "./Task.js";

export class TaskManager {
    constructor(store) {
        this.store = store;
    }

    checkStore() {
        return this.store.checkStore();
    }

    getStore() {
        return this.store.getBaseTasks();
    }

    createTask(title, date) {
       
        this.id = `task${Date.now()}`;
        this.isDone = false;
        const newTask = Task.deparse({
            id: this.id,
            title: title,
            date: date,
            isDone: this.isDone
        });
        console.log(newTask);
        return this.store.addTask(newTask);
    }

    getLastTask() {
        return this.store.getLastTask();
    }

    deleteTask(id) {
        return this.store.removeTask(id);
    }

    toggleTask(id) { 
       return this.store.updateTask(id);
    }
}