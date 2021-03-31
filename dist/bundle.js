/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/base.css":
/*!**************************!*\
  !*** ./src/css/base.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/base.css */ "./src/css/base.css");
/* harmony import */ var _js_TodoApp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/TodoApp.js */ "./src/js/TodoApp.js");



const todoApp = new _js_TodoApp_js__WEBPACK_IMPORTED_MODULE_1__.TodoApp();

todoApp.execute();

/***/ }),

/***/ "./src/js/AbstractStore.js":
/*!*********************************!*\
  !*** ./src/js/AbstractStore.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractStore": () => (/* binding */ AbstractStore)
/* harmony export */ });
class AbstractStore {

    checkStore() {
        throw new Error('not implemented');
    }

    getBaseTasks() {
        throw new Error('not implemented');
    }

    addTask() {
        throw new Error('not implemented');
    }

    getLastTask() {  
        throw new Error('not implemented');
    }

    removeTask() {
        throw new Error('not implemented');
    }

    updateTask() {
        throw new Error('not implemented');
    }
}



/***/ }),

/***/ "./src/js/Render.js":
/*!**************************!*\
  !*** ./src/js/Render.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Render": () => (/* binding */ Render)
/* harmony export */ });
class Render {
    constructor(taskContainerRef, todoApp) {
        this._taskContainerRef = taskContainerRef;
        this._todoApp = todoApp;
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
  
        this._taskContainerRef.appendChild(div);
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

/***/ }),

/***/ "./src/js/Store.js":
/*!*************************!*\
  !*** ./src/js/Store.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Store": () => (/* binding */ Store)
/* harmony export */ });
/* harmony import */ var _AbstractStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractStore.js */ "./src/js/AbstractStore.js");
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task.js */ "./src/js/Task.js");




class Store extends _AbstractStore_js__WEBPACK_IMPORTED_MODULE_0__.AbstractStore {

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
                const lastTask = _Task_js__WEBPACK_IMPORTED_MODULE_1__.Task.parse(currentBase[currentBase.length - 1]);
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
                            const updateTask = _Task_js__WEBPACK_IMPORTED_MODULE_1__.Task.parse(task);
                            updateTask.toggle();
                            currentBase[index] = _Task_js__WEBPACK_IMPORTED_MODULE_1__.Task.deparse(updateTask);
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

/***/ }),

/***/ "./src/js/StoreLS.js":
/*!***************************!*\
  !*** ./src/js/StoreLS.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StoreLS": () => (/* binding */ StoreLS)
/* harmony export */ });
/* harmony import */ var _AbstractStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractStore.js */ "./src/js/AbstractStore.js");
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task.js */ "./src/js/Task.js");



class StoreLS extends _AbstractStore_js__WEBPACK_IMPORTED_MODULE_0__.AbstractStore {
    
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
                const lastTask = _Task_js__WEBPACK_IMPORTED_MODULE_1__.Task.parse(currentBase[currentBase.length - 1]);
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
                            const updateTask = _Task_js__WEBPACK_IMPORTED_MODULE_1__.Task.parse(task);
                            updateTask.toggle();
                            currentBase[index] = _Task_js__WEBPACK_IMPORTED_MODULE_1__.Task.deparse(updateTask);
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

/***/ }),

/***/ "./src/js/Task.js":
/*!************************!*\
  !*** ./src/js/Task.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
class Task {
    constructor(id, title, date, isDone,) {
        this._id = id;
        this._title = title;
        this._date = date;
        this._isDone = isDone;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get date() {
        return this._date;
    }
    get isDone() {
        return this._isDone;
    }
    toggle() {
        return this._isDone = !this._isDone;
    }

    static parse({ id, title, date, isDone }) {
        return new Task(
            id,
            title,
            date,
            isDone
        );
    }

    static deparse({ id, title, date, isDone }) {
        return ({//JSON.stringify({ //убрал в другое место
            id,
            title,
            date,
            isDone,
        });
    }
}


/***/ }),

/***/ "./src/js/TaskManager.js":
/*!*******************************!*\
  !*** ./src/js/TaskManager.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskManager": () => (/* binding */ TaskManager)
/* harmony export */ });
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task.js */ "./src/js/Task.js");


class TaskManager {
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
        const newTask = _Task_js__WEBPACK_IMPORTED_MODULE_0__.Task.deparse({
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

/***/ }),

/***/ "./src/js/Todo.js":
/*!************************!*\
  !*** ./src/js/Todo.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Todo": () => (/* binding */ Todo)
/* harmony export */ });
class Todo {
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


/***/ }),

/***/ "./src/js/TodoApp.js":
/*!***************************!*\
  !*** ./src/js/TodoApp.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoApp": () => (/* binding */ TodoApp)
/* harmony export */ });
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Store */ "./src/js/Store.js");
/* harmony import */ var _StoreLS_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StoreLS.js */ "./src/js/StoreLS.js");
/* harmony import */ var _TaskManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TaskManager.js */ "./src/js/TaskManager.js");
/* harmony import */ var _Render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Render.js */ "./src/js/Render.js");
/* harmony import */ var _Todo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Todo.js */ "./src/js/Todo.js");






class TodoApp {
    constructor() {
        // const store = new Store();
        const store = new _StoreLS_js__WEBPACK_IMPORTED_MODULE_1__.StoreLS();
        const taskManager = new _TaskManager_js__WEBPACK_IMPORTED_MODULE_2__.TaskManager(store, this); 
        const render = new _Render_js__WEBPACK_IMPORTED_MODULE_3__.Render(document.querySelector('.tasks'), this);
        this._todo = new _Todo_js__WEBPACK_IMPORTED_MODULE_4__.Todo(taskManager, render);
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0,
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			__webpack_require__.O();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktodov3"] = self["webpackChunktodov3"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["bundle"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map