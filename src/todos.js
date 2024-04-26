let projectsArray = [];

class Project {
  constructor(title) {
    this.title = title;
    this.storage = [];
  }

  deleteTodo(name) {
    this.storage.forEach((item) => {
      if (item.title == name) {
        this.storage.splice([this.storage.indexOf(item)], 1);
      }
    });
  }

  showTodo(name) {
    this.storage.forEach((item) => {
      if (item.title == name) {
        console.log(item);
      }
    });
  }

  changeTodoStatus(name) {
    this.storage.forEach((item) => {
      if (item.title == name) {
        item.changeStatus();
      }
    });
  }

  editTodo(
    name,
    newTitle,
    newDescription,
    newDueDate,
    newPriority,
    newProject
  ) {
    this.storage.forEach((item) => {
      if (item.title == name) {
        item.edit(
          newTitle,
          newDescription,
          newDueDate,
          newPriority,
          newProject
        );
      }
    });
  }
}

class Todo {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.status = 'Incomplete';
  }

  edit(
    newTitle = this.title,
    newDescription = this.description,
    newDueDate = this.dueDate,
    newPriority = this.priority,
    newProject = this.project
  ) {
    this.title = newTitle;
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

function addProject(name) {
  if (projectsArray.length == 0) {
    projectsArray.push(new Project(name));
  } else {
    projectsArray.forEach((item) => {
      if (item.title == name) {
        console.log('Such project already exists');
      } else {
        projectsArray.push(new Project(name));
      }
    });
  }
}

function renameProject(name, newName) {
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
}

function deleteProject(name) {
  projectsArray.forEach((item) => {
    if (item.title == name) {
      projectsArray.splice([projectsArray.indexOf(item)], 1);
    }
  });
}

function addTodo(title, description, dueDate, priority, project) {
  let todo = new Todo(title, description, dueDate, priority, project);
  projectsArray.forEach((item) => {
    if (item.title == project) {
      item.storage.push(todo);
    }
  });
}
