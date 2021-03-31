import { AbstractStore } from "./AbstractStore.js";
import { Task } from "./Task.js";

export class StoreLS extends AbstractStore {
    
    constructor() {
        super();
    }

    checkStore() {
        // await super.checkStore();
        return Promise.resolve(localStorage.getItem('dbTasks') !== null);
    }

    setBaseTasks(baseName, dataBase) {
        return Promise.resolve(localStorage.setItem(baseName, JSON.stringify(dataBase)));
    }

    removeBaseTasks(baseName) {
        return Promise.resolve(localStorage.removeItem(baseName));
    }

    getBaseTasks() {
        
        // await super.getBaseTasks();
        return Promise.resolve(JSON.parse(localStorage.getItem('dbTasks')));
    }

    async addTask(task) {
        
        // await super.addTask();
        const checkStore = await this.checkStore();
        let resultBase = [];

        if (checkStore) {
            resultBase = await this.getBaseTasks();
            await this.removeBaseTasks('dbTasks');
            resultBase.push(task);
        } else {
            resultBase.push(task);
        }

        await this.setBaseTasks('dbTasks', resultBase);
    }

    getLastTask() {

        // await super.getLastTask();
        return new Promise ((resolve) => {
            this.getBaseTasks()
            .then ((currentBase) => {
                const lastTask = Task.parse(currentBase[currentBase.length - 1]);
                resolve (lastTask);
            });
        });
    }

    removeTask(id) {

        // await super.removeTask();
        return new Promise ((resolve) => {
            resolve (
                this.getBaseTasks()
                .then((currentBase) => {
                    return new Promise (async (resolve) => {
                        await this.removeBaseTasks('dbTasks');
                        const newBaseTasks = []; 
                        currentBase.forEach((task) => {
                            if( task.id !== id) {
                            newBaseTasks.push(task);
                            }
                        });
                        resolve(newBaseTasks);
                    })
                }) 
                .then(async (newBaseTasks) => {
                    await this.setBaseTasks('dbTasks', newBaseTasks);
                })
            )
        });
    }

    updateTask(id) {

        // await super.updateTask();
        return new Promise ((resolve) => {
            this.getBaseTasks()
            .then((currentBase) => {
                return new Promise (async (resolve) => {
                    let newIsDone = '';
                    await new Promise ((resolve) => {
                        //  setTimeout(() => {
                            resolve(this.removeBaseTasks('dbTasks'));
                        //  }, 5000)
                    });
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
            })
            .then (([currentBase, newIsDone]) => {
                return new Promise (async (resolve) => {
                    await new Promise ((resolve) => {
                        // setTimeout(() => {
                            resolve(this.setBaseTasks('dbTasks', currentBase));
                        // }, 5000)
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