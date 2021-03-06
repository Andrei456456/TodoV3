import { Store } from "./Store";
import { StoreLS } from "./StoreLS.js";
import { TaskManager } from "./TaskManager.js";
import { Render } from "./Render.js";
import { Todo } from "./Todo.js";

export class TodoApp {
    constructor() {
        // const store = new Store();
        const store = new StoreLS();
        const taskManager = new TaskManager(store, this); 
        const render = new Render(document.querySelector('.tasks'), this);
        this._todo = new Todo(taskManager, render);
    }

    execute() {
        this._todo.firstUpdateTasks();

        const buttonCreate = document.querySelector(".btnCreate");
      
        buttonCreate.addEventListener("click", () => {
            const inputTitleRef = document.querySelector(".title").value;
            const inputDateRef = document.querySelector(".date").value;            
            this._todo.addTask(inputTitleRef, inputDateRef);
        });

        const tasksRef = document.querySelector(".tasks");
        tasksRef.addEventListener("click", () => {
            this._todo.clickTask(tasksRef);
       });
    }
    
}