import { AbstractStore } from "./AbstractStore.js";
import { Task } from "./Task.js";


export class Store extends AbstractStore {

    constructor() {
        super();
        this._dbTasks = [];
    }

    

    checkStore() {
        // await super.checkStore();
        return Promise.resolve(this._dbTasks.length > 0);
    }

    setBaseTasks(dataBase) {
        return Promise.resolve( this._dbTasks = dataBase);
    }

    removeBaseTasks() {
        return Promise.resolve(this._dbTasks = []);
    }

    getBaseTasks() {
        // await super.getBaseTasks();
        return Promise.resolve(this._dbTasks);
    }

    async addTask(task) {

        const checkStore = await this.checkStore();
        let resultBase = [];

        if (checkStore) {
            resultBase = await this.getBaseTasks();
            await this.removeBaseTasks();
            resultBase.push(task);
        } else {
            resultBase.push(task);
        }

        await this.setBaseTasks(resultBase);
        console.log( await this.getBaseTasks());
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
                        await this.removeBaseTasks();
                        const newBaseTasks = [];
                        currentBase.forEach((task) => {
                            if(task.id !== id) {
                            newBaseTasks.push(task);
                            }
                        });
                        resolve(newBaseTasks);
                    })
                }) 
                .then(async (newBaseTasks) => {
                    await this.setBaseTasks(newBaseTasks);
                    console.log( await this.getBaseTasks());
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
                            resolve(this.removeBaseTasks());
                        //  }, 5000)
                    });
                    currentBase.forEach((task,index) => {
                        if( task.id === id) {
                            const updateTask = Task.parse(task);
                            updateTask.toggle();
                            currentBase[index] = Task.deparse(updateTask);
                            newIsDone = currentBase[index].isDone;                 
                        }
                    });
                    resolve( [currentBase, newIsDone] );
                });
            })
            .then(([currentBase, newIsDone]) => {
                return new Promise (async (resolve) => {
                    await new Promise ((resolve) => {
                        // setTimeout(() => {
                            resolve(this.setBaseTasks(currentBase));
                        // }, 5000)
                    });
                    resolve(newIsDone);
                });
            })
            .then(async (newIsDone) => {
                console.log( await this.getBaseTasks());
                resolve(newIsDone);
            });  
        });
        
    }
}