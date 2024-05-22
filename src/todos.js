const saveToLocalStorage = function (object, keyName) {
  let passArray = JSON.stringify(object);
  localStorage.setItem(keyName, passArray);
};

const setProjectIndex = function (value) {
  localStorage.setItem('projectIndex', value);
};

const getProjectIndex = function () {
  return JSON.parse(localStorage.getItem('projectIndex'));
};

const getAllTodosArray = function () {
  return JSON.parse(localStorage.getItem('allTodos'));
};

const saveAllTodosArray = function () {
  localStorage.setItem('allTodos', JSON.stringify(allTodosArray));
};

let allTodosArray;

if (getAllTodosArray() === null) {
  allTodosArray = [];
} else {
  allTodosArray = getAllTodosArray();
}

class Project {
  constructor(title, index) {
    this.title = title;
    this.index = index;
    this.storage = [];
  }

  deleteTodo(name) {
    this.storage.forEach((item) => {
      if (item.index == name) {
        this.storage.splice([this.storage.indexOf(item)], 1);
      }
    });
  }
}

class Todo {
  constructor(title, index, description, dueDate, priority, project) {
    this.title = title;
    this.index = index;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.status = 'Incomplete';
  }

  edit(
    newTitle = this.title,
    index,
    newDescription = this.description,
    newDueDate = this.dueDate,
    newPriority = this.priority,
    newProject = this.project
  ) {
    this.title = newTitle;
    this.index = index;
    this.description = newDescription;
    this.dueDate = newDueDate;
    this.priority = newPriority;
    this.project = newProject;
  }

  changeStatus() {
    if (this.status === 'Complete') {
      this.status = 'Incomplete';
    } else if (this.status === 'Incomplete') {
      this.status = 'Complete';
    }
  }
}

const addProject = function (name, projectIndex) {
  let counter = 0;
  let project = new Project(name, projectIndex);

  if (localStorage.length == 0) {
    // projectsArray.push(project);
    saveToLocalStorage(project, project.index);
    return project;
  } else {
    let localKeys = Object.keys(localStorage);
    localKeys.forEach((key) => {
      if (key == projectIndex) {
        counter++;
      }
    });

    // projectsArray.forEach((item) => {
    //   if (item.index == projectIndex) {
    //     counter++;
    //   }
    // });

    if (counter === 0) {
      // projectsArray.push(project);
      saveToLocalStorage(project, project.index);
      return project;
    }
  }
};

// const renameProject = function (projectIndex, newTitle) {
//   projectsArray.forEach((item) => {
//     if (item.index == projectIndex) {
//       item.title = newTitle;
//     }
//   });
// };

const deleteProject = function (projectIndex) {
  let a;
  let b;
  let c;

  let localKeys = Object.keys(localStorage);
  localKeys.forEach((key) => {
    if (key == projectIndex) {
      b = JSON.parse(localStorage.getItem(key));
      a = b.storage;
      c = key;
    }
  });

  for (let i = 0; i < allTodosArray.length; i++) {
    a.forEach((todo) => {
      if (allTodosArray[i].index == todo.index) {
        allTodosArray.splice([i], 1);
        i - 1;
      }
    });
  }

  allTodosArray.forEach((item) => {
    a.forEach((todo) => {
      if (item.index == todo.index) {
        allTodosArray.splice(item.index, 1);
      }
    });
  });

  saveAllTodosArray();
  localStorage.removeItem(c);
};

const addTodo = function (
  title,
  index,
  description,
  dueDate,
  priority,
  projectIndex
) {
  let todo = new Todo(
    title,
    index,
    description,
    dueDate,
    priority,
    projectIndex
  );

  let localKeys = Object.keys(localStorage);
  localKeys.forEach((key) => {
    if (key == projectIndex) {
      let project = JSON.parse(localStorage.getItem(key));
      project.storage.push(todo);
      saveToLocalStorage(project, key);
      allTodosArray.push(todo);
      saveAllTodosArray();
    }
  });

  return todo;
};

const getProject = function (projectIndex) {
  let a = 'value';

  console.log(projectIndex);

  let localKeys = Object.keys(localStorage);
  localKeys.forEach((key) => {
    if (key == projectIndex) {
      let project = JSON.parse(localStorage.getItem(key));
      a = project.storage;
    }
  });

  // projectsArray.forEach((item) => {
  //   if (item.index == projectIndex) {
  //     console.log(item.storage);
  //     a = item.storage;
  //   }
  // });

  if (a === 'value') {
    console.log('No such project');
  } else {
    return a;
  }
};

const changeTodoStatus = function (name, projectIndex) {
  let a;
  let b;
  let c;

  let localKeys = Object.keys(localStorage);
  localKeys.forEach((key) => {
    if (key == projectIndex) {
      b = JSON.parse(localStorage.getItem(key));
      a = b.storage;
    }
  });

  console.log(a);

  a.forEach((item) => {
    if (item.index == name) {
      item.changeStatus = function () {
        if (this.status === 'Complete') {
          this.status = 'Incomplete';
        } else if (this.status === 'Incomplete') {
          this.status = 'Complete';
        }
      };

      item.changeStatus();
      c = item;
    }
  });

  allTodosArray.forEach((item) => {
    if (item.index == c.index) {
      item.changeStatus = function () {
        if (this.status === 'Complete') {
          this.status = 'Incomplete';
        } else if (this.status === 'Incomplete') {
          this.status = 'Complete';
        }
      };

      item.changeStatus();
    }
  });

  saveAllTodosArray();
  saveToLocalStorage(b, b.index);
  return c;
};

const editTodo = function (
  projectIndex,
  newTitle,
  index,
  newDescription,
  newDueDate,
  newPriority,
  newProjectIndex
) {
  let a;
  let b;
  let c;

  let localKeys = Object.keys(localStorage);
  localKeys.forEach((key) => {
    if (key == projectIndex) {
      b = JSON.parse(localStorage.getItem(key));
      a = b.storage;
    }
  });

  a.forEach((item) => {
    if (item.index === index) {
      item.edit = function (
        newTitle = this.title,
        index,
        newDescription = this.description,
        newDueDate = this.dueDate,
        newPriority = this.priority,
        newProject = this.project
      ) {
        this.title = newTitle;
        this.index = index;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
        this.project = newProject;
      };

      item.edit(
        newTitle,
        index,
        newDescription,
        newDueDate,
        newPriority,
        newProjectIndex
      );

      c = item;
    }
  });

  allTodosArray.forEach((item) => {
    if (item.index == c.index) {
      item.edit = function (
        newTitle = this.title,
        index,
        newDescription = this.description,
        newDueDate = this.dueDate,
        newPriority = this.priority,
        newProject = this.project
      ) {
        this.title = newTitle;
        this.index = index;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
        this.project = newProject;
      };

      item.edit(
        newTitle,
        index,
        newDescription,
        newDueDate,
        newPriority,
        newProjectIndex
      );
    }
  });

  saveAllTodosArray();
  saveToLocalStorage(b, b.index);
  return c;
};

const deleteTodo = function (projectIndex, index) {
  let localKeys = Object.keys(localStorage);
  localKeys.forEach((key) => {
    if (key == projectIndex) {
      let b = JSON.parse(localStorage.getItem(key));

      b.deleteTodo = function (name) {
        this.storage.forEach((item) => {
          if (item.index == name) {
            this.storage.splice([this.storage.indexOf(item)], 1);
          }
        });
      };

      b.deleteTodo(index);
      saveToLocalStorage(b, b.index);
    }
  });

  allTodosArray.forEach((item) => {
    if (item.index == index) {
      allTodosArray.splice([allTodosArray.indexOf(item)], 1);
      saveAllTodosArray();
    }
  });
};

export {
  addProject,
  // renameProject,
  deleteProject,
  addTodo,
  getProject,
  changeTodoStatus,
  editTodo,
  deleteTodo,
  setProjectIndex,
  getProjectIndex,
  allTodosArray,
};
