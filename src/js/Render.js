export class Render {
    constructor(taskContainerRef, todoApp) {
        this.taskContainerRef = taskContainerRef;
        this.todoApp = todoApp;
    }
    
    render(task) {
      //  {id:'', title:'', date:'', isDone:''}
        
        const div = document.createElement("div");
        div.setAttribute('id', `${task.id}`);

        const title = document.createElement("p");
        title.textContent = task.title;
        const date = document.createElement("p");
        date.textContent = task.date;
  
        const buttonSave = document.createElement("button");
        if (task.isDone === true) {
          div.classList.add('done-todo');
          buttonSave.classList.add('td-item-buttonSave-true');
        }
        buttonSave.textContent = "Done";
      
        const buttonDelete = document.createElement("button");
      
        buttonDelete.textContent = "Delete";
  
        const styleViewTasksItem = [
          { name: div, arrClasses: ['td-item']},
          { name: title, arrClasses: ['td-item-title']},
          { name: date, arrClasses: ['td-item-date']},
          { name: buttonSave, arrClasses: ['td-item-buttonSave','td-item-button']},
          { name: buttonDelete, arrClasses: ['td-item-buttonDelete', 'td-item-button']},
        ];
        styleViewTasksItem.forEach( item => {
          this._setTasksClasses(item.name, item.arrClasses);
        });

        div.appendChild(title);
        div.appendChild(date);
        div.appendChild(buttonSave);
        div.appendChild(buttonDelete);
  
        this.taskContainerRef.appendChild(div);
    }

    _setTasksClasses(name, arrClasses) {
        for (let item of arrClasses ) {
          name.classList.add(item);
        }
    }
  
    resetInputsTitleDate() {
        const inputTitleRef = document.querySelector(".title");
        const inputDateRef = document.querySelector(".date");
        inputTitleRef.value = "";
        inputDateRef.value = "";
    }
    
    removeTaskById(id) {
        const taskRef = document.querySelector(`#${id}`);
        taskRef.remove();
    }

    renderSingleTaskById(id, isDone) { 
        const taskRef = document.querySelector(`#${id}`);
        const buttonRef = document.querySelector(`#${id} > .td-item-buttonSave`);
        if (isDone === true) {
        taskRef.classList.add('done-todo');
        buttonRef.classList.add('td-item-buttonSave-true');
        } else {
            taskRef.classList.remove('done-todo');
            buttonRef.classList.remove('td-item-buttonSave-true');
        }
    }
}