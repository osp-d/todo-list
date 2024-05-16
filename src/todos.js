let projectsArray = [];

export class Project {
  constructor(title) {
    this.title = title;
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

export class Todo {
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

const addProject = function (name) {
  let counter = 0;

  if (projectsArray.length == 0) {
    projectsArray.push(new Project(name));
  } else {
    projectsArray.forEach((item) => {
      if (item.title == name) {
        counter++;
      }
    });

    if (counter === 0) {
      projectsArray.push(new Project(name));
    }
  }
};

const renameProject = function (name, newName) {
  projectsArray.forEach((item) => {
    if (item.title == name) {
      projectsArray.forEach((item) => {
        if (item.title == newName) {
          console.log('Such project already exists');
        } else {
          item.name = newName;
        }
      });
    }
  });
};

const deleteProject = function (name) {
  projectsArray.forEach((item) => {
    if (item.title == name) {
      projectsArray.splice([projectsArray.indexOf(item)], 1);
    }
  });
};

const addTodo = function (
  title,
  index,
  description,
  dueDate,
  priority,
  project
) {
  let todo = new Todo(title, index, description, dueDate, priority, project);
  projectsArray.forEach((item) => {
    if (item.title == project) {
      item.storage.push(todo);
    }
  });
  return todo;
};

const showTodo = function (projectName) {
  let a;

  console.log(projectName);

  projectsArray.forEach((item) => {
    if (item.title == projectName) {
      console.log(item.storage);
      a = item.storage;
    }
  });

  return a;
};

const changeTodoStatus = function (name, projectName) {
  let a;

  projectsArray.forEach((item) => {
    if (item.title == projectName) {
      a = item.storage;
    }
  });

  console.log(a);

  a.forEach((item) => {
    if (item.index == name) {
      item.changeStatus();
    }
  });
};

const editTodo = function (
  name,
  projectName,
  newTitle,
  index,
  newDescription,
  newDueDate,
  newPriority,
  newProject
) {
  let a;

  projectsArray.forEach((item) => {
    if (item.title == projectName) {
      a = item.storage;
    }
  });

  a.forEach((item) => {
    if (item.index == name) {
      item.edit(
        newTitle,
        index,
        newDescription,
        newDueDate,
        newPriority,
        newProject
      );
    }
  });
};

export {
  addProject,
  renameProject,
  deleteProject,
  addTodo,
  showTodo,
  changeTodoStatus,
  editTodo,
  projectsArray,
};
