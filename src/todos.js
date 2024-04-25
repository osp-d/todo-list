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
}

class Todo {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }

  addTodo() {
    this.project.storage.push(this);
  }
  s;

  editTodo(
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
}

function deleteProject(name) {
  name = null;
}
