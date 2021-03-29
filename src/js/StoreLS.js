import { AbstractStore } from "./AbstractStore.js";
import { Task } from "./Task.js";

export class StoreLS extends AbstractStore {
    
    constructor() {
        super();
    }

    async checkStore() {
        
        await super.checkStore();
        return Promise.resolve(localStorage.getItem('dbTasks') !== null);
    }

    async getBaseTasks() {
        
        await super.getBaseTasks();
        return Promise.resolve(JSON.parse(localStorage.getItem('dbTasks')));
    }

    async addTask(task) {

        await super.addTask();
        return Promise.resolve(async () => {
            await this.checkStore()
            .then(async (checkStore) => {
                if (checkStore) {
                   await this.getBaseTasks()
                    .then((currentBase) => {
                        localStorage.removeItem('dbTasks');
                        currentBase.push(task);
                        Promise.resolve(localStorage.setItem('dbTasks', JSON.stringify(currentBase)));
                    });
                } else {
                    const newCurrentBase = [];
                    newCurrentBase.push(task);
                    Promise.resolve(localStorage.setItem('dbTasks', JSON.stringify(newCurrentBase)));
                }
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
            Promise.resolve(this.getBaseTasks())
            .then((currentBase) => {
                return new Promise ((resolve) => {
                    const promise = new Promise ((resolve) => {
                            // setTimeout(() => {
                                resolve(localStorage.removeItem('dbTasks'));
                            // }, 5000)
                        });           
                    promise.then (() => {
                        const newBaseTasks = []; 
                        currentBase.forEach((task) => {
                            if( task.id !== id) {
                            newBaseTasks.push(task);
                            }
                        });
                        resolve(newBaseTasks);
                    })
                })
            }) 
            .then((newBaseTasks) => {
                new Promise ((resolve) => {
                    // setTimeout(() => {
                        resolve(
                            localStorage.setItem(
                                'dbTasks', JSON.stringify(newBaseTasks)));
                    // }, 5000);
                })
                resolve ();
            })
        });
    }

    async updateTask(id) {

        await super.updateTask();
        return new Promise ((resolve) => {
            Promise.resolve(this.getBaseTasks())
            .then((currentBase) => {
                return new Promise ((resolve) => {
                    let newIsDone = '';
                    const promise = new Promise ((resolve) => {
                        //  setTimeout(() => {
                            resolve(localStorage.removeItem('dbTasks'));
                        //  }, 5000)
                    });
                    promise.then(() => {
                        currentBase.forEach((task, index) => {
                            if (task.id === id) {
                                const updateTask = Task.parse(task);
                                updateTask.toggle();
                                currentBase[index] = Task.deparse(updateTask);
                                newIsDone = currentBase[index].isDone;  
                            }
                        });
                        resolve( [currentBase, newIsDone] );
                    });
                });
            })
            .then (([currentBase, newIsDone]) => {
                return new Promise ((resolve) => {
                    const promise = new Promise ((resolve) => {
                        // setTimeout(() => {
                            resolve(
                                localStorage.setItem(
                                    'dbTasks',
                                    JSON.stringify(currentBase)
                            ));
                        // }, 5000)
                    });
                    promise.then(() => {
                        resolve(newIsDone);
                    });
                });
            })
            .then((newIsDone) => {
                resolve(newIsDone);
            });   
        });  
    } 
}