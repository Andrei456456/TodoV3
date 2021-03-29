export class Todo {
    constructor(taskManager, render) {
        this.taskManager = taskManager;
        this.render = render;
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
        let firstValueOfStore = ''; 
        this.taskManager.checkStore()
        .then((existenceDataAtStore) => {
            if (existenceDataAtStore) { 
                firstValueOfStore = this.taskManager.getStore()
                .then((firstValueOfStore) => {
                    firstValueOfStore.forEach((task) => {
                        this.render.render(task);    
                    });
                });
            }
        })
        .then(() => {
            this.showLastMessage();
        });
    }

    addTask() {
        const inputTitleRef = document.querySelector(".title").value;
        const inputDateRef = document.querySelector(".date").value;
        // console.log(`${inputTitleRef} ${inputDateRef}`);
        
        this.taskManager.createTask(inputTitleRef, inputDateRef)
        .then(async (data) => {
            await data();
        })
        .then (() => {
            return this.taskManager.getLastTask();
        })
        .then((data) => {  
                this.render.render( data );
                this.render.resetInputsTitleDate();
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
        this.taskManager.deleteTask(idElement)
        .then(() => {
            this.render.removeTaskById(idElement);
        })
        .then(() => {
            this.showLastMessage();
        });
    }

    doneTask(idElement) {   
        this.taskManager.toggleTask(idElement)
        .then((isDone) => {
            // console.log(isDone);
            
        this.render.renderSingleTaskById(idElement, isDone);
        })
        .then(() => {
            this.showLastMessage();
        });
    }
}
