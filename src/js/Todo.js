export class Todo {
    constructor(taskManager, render) {
        this._taskManager = taskManager;
        this._render = render;
        this._actionsBase = [ 
            { 'actionName': 'Delete', 'actionLink': this.deleteTask.bind(this) },
            { 'actionName': 'Done', 'actionLink': this.doneTask.bind(this) } ];
    }

    get actionsBase() {
     return this._actionsBase;   
    }

    showLastMessage() {
        return console.log('Excellent! You can make next action.');
        
    }

    firstUpdateTasks() {
        this._taskManager.checkStore()
        .then( async (existenceDataAtStore) => {
            if (existenceDataAtStore) {
                const firstValueOfStore = await this._taskManager.getStore();
                firstValueOfStore.forEach((task) => {
                    this._render.render(task);    
                });
            }
        })
        .then(() => {
            this.showLastMessage();
        });
    }

    addTask(inputTitleRef, inputDateRef) {
        this._taskManager.createTask(inputTitleRef, inputDateRef)
        .then (() => {
            return this._taskManager.getLastTask();
        })
        .then((data) => {  
                this._render.render( data );
                this._render.resetInputsTitleDate();
        })
        .then(() => {
            this.showLastMessage();
        });
    }

    clickTask (tasksRef) {
        const actionAfterClick = this.checkClickForAction(tasksRef);
        console.log(actionAfterClick);
        if (actionAfterClick.actionName !== '') {
            this.actionsBase.forEach( (action) => {
                if ( actionAfterClick.actionName === action.actionName) {
                    this.makeAction(action.actionLink, actionAfterClick.idElement);
                }
            });
        }
    }

    checkClickForAction(tasksRef) {
     this.tasksRef = tasksRef;
        let target = event.target;
        let actionName = '';
        let idElement = '';

        while (target !== this.tasksRef) {
            if (target.tagName === 'BUTTON') {
                this._actionsBase.forEach((element) => {
                    if (target.textContent === element.actionName) {
                        actionName = element.actionName;
                        idElement = target.parentNode.id;
                    }
                });
            }
        target = target.parentNode;
        }
        return { 'actionName': actionName,
                'idElement': idElement };
    }

    makeAction(action, arg) {
        action(arg);
    }

    deleteTask(idElement) {
        this._taskManager.deleteTask(idElement)
        .then(() => {
            this._render.removeTaskById(idElement);
        })
        .then(() => {
            this.showLastMessage();
        });
    }

    doneTask(idElement) {   
        this._taskManager.toggleTask(idElement)
        .then((isDone) => {
        this._render.renderSingleTaskById(idElement, isDone);
        })
        .then(() => {
            this.showLastMessage();
        });
    }
}
