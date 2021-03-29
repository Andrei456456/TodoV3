import { AbstractStore } from "./AbstractStore.js";
import { Task } from "./Task.js";


export class Store extends AbstractStore {

    constructor() {
        super();
        this._dbTasks = [];
    }

    setDataBase (newDataBase) {
        this._dbTasks = newDataBase;
    }

    async checkStore() {
        await super.checkStore();
        return Promise.resolve(this._dbTasks.length > 0);
    }

    async getBaseTasks() {
        await super.getBaseTasks();
        return Promise.resolve(this._dbTasks);
    }

    async addTask(task) {
        await super.addTask();
        return Promise.resolve(async() => {
            await this.checkStore()
            .then(async (checkStore) => {
                if (checkStore) {
                    await this.getBaseTasks()
                    .then((currentBase) => {
                        currentBase.push(task);
                        this.setDataBase(currentBase);
                    });
                } else {
                    const newCurrentBase = [];
                    newCurrentBase.push(task);
                    this.setDataBase(newCurrentBase); 
                }
            })
            .then(() => {
                console.log(this._dbTasks);
            });
        });
    }

    async getLastTask() {
        await super.getLastTask();
        return new Promise ((resolve) => {
            this.getBaseTasks()
            .then ((currentBase) => {
                const lastTask = Task.parse(currentBase[currentBase.length - 1]);
                resolve (lastTask);
            });
        });
    }

    async removeTask(id) {
        await super.removeTask();
        return new Promise ((resolve) => {
            this.getBaseTasks()
            .then((currentBase) => {
                return new Promise ((resolve) => {
                    const newBaseTasks = [];
                    currentBase.forEach((task) => {
                        if(task.id !== id) {
                        newBaseTasks.push(task);
                        }
                    });
                    this.setDataBase(newBaseTasks); 
                    resolve(this._dbTasks);
                })
            }) 
            .then(() => {
                resolve ();
            })
            .then(() => {
                console.log(this._dbTasks);
            });
        });
    }
   
    async updateTask(id) {
        await super.updateTask();
        return new Promise ((resolve) => {
            this.getBaseTasks()
            .then((currentBase) => {
                return new Promise ((resolve) => {
                    let newIsDone = '';
                    currentBase.forEach((task,index) => {
                        if( task.id === id) {
                            const updateTask = Task.parse(task);
                            updateTask.toggle();
                            currentBase[index] = Task.deparse(updateTask);
                            this.setDataBase(currentBase);
                            newIsDone = this._dbTasks[index].isDone;
                        }
                    });
                    resolve(newIsDone);
                });
            })
            .then((newIsDone) => {                
            resolve(newIsDone);
            });
        });
    }
}