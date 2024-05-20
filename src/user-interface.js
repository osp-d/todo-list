import {
  addProject,
  renameProject,
  deleteProject,
  addTodo,
  getProject,
  changeTodoStatus,
  editTodo,
  deleteTodo,
  allTodosArray,
  projectsArray,
} from './todos.js';

// Creating DOM elements

let currentProjectIndex;
let todoIndex = 0;
let projectIndex = 0;
let delivery;

const sidebar = document.querySelector('div.sidebar');
const projectBtnsArea = document.querySelector('div.user-projects');
const addProjectBtn = document.querySelector('button.add-project');
const todoForm = document.querySelector('form#new-todo-form');
const editTodoForm = document.querySelector('form#edit-todo-form');
const cancelNewTodoFormBtn = document.querySelector('input#cancel-new-todo');
const cancelEditTodoFormBtn = document.querySelector('input#cancel-edit-todo');
const projectMenuIcon = document.querySelector('svg.menu');
const newProjectWrapper = document.createElement('div');
const inputProject = document.createElement('input');
const submitProjectBtn = document.createElement('button');
const cancelProjectBtn = document.createElement('button');
const addTodoBtn = document.createElement('button');
const plusIcon = document.querySelector('svg.plus');
const plusIconCopy = plusIcon.cloneNode(true);
const todoMainSpace = document.querySelector('div.content');
const allTodosBtn = document.querySelector('div.all-todos');

addHover(allTodosBtn, '#f3f4f6', 'transparent');

allTodosBtn.addEventListener('click', () => {
  while (todoMainSpace.firstChild) {
    todoMainSpace.removeChild(todoMainSpace.lastChild);
  }

  allTodosArray.forEach((element) => {
    const todoWrapper = document.createElement('div');
    todoWrapper.classList.add('todo-wrapper');
    const checkTodo = document.createElement('input');
    checkTodo.setAttribute('type', 'checkbox');
    const todoName = document.createElement('p');
    todoName.textContent = element.title;
    const todoDate = document.createElement('p');
    todoDate.textContent = element.dueDate;
    const todoPriority = document.createElement('p');
    todoPriority.textContent = element.priority;
    const deleteTodoBtn = document.createElement('button');
    deleteTodoBtn.textContent = 'Delete';
    deleteTodoBtn.classList.add('delete-todo');
    const editTodoBtn = document.createElement('button');
    editTodoBtn.textContent = 'Edit';
    editTodoBtn.classList.add('edit-todo');

    if (element.status == 'Complete') {
      checkTodo.checked = true;
      todoName.style.textDecorationLine = 'line-through';
      todoDate.style.textDecorationLine = 'line-through';
      todoPriority.style.textDecorationLine = 'line-through';
      todoWrapper.style.opacity = '0.8';
    }

    checkTodo.addEventListener('click', () => {
      console.log(currentProjectIndex);
      changeTodoStatus(element.index, currentProjectIndex);

      if (element.status == 'Complete') {
        checkTodo.checked = true;
        todoName.style.textDecorationLine = 'line-through';
        todoDate.style.textDecorationLine = 'line-through';
        todoPriority.style.textDecorationLine = 'line-through';
        todoWrapper.style.opacity = '0.8';
      } else {
        checkTodo.checked = false;
        todoName.style.textDecorationLine = 'none';
        todoDate.style.textDecorationLine = 'none';
        todoPriority.style.textDecorationLine = 'none';
        todoWrapper.style.opacity = '1';
      }
    });

    editTodoBtn.addEventListener('click', () => {
      todoForm.classList.add('invisible');
      todoForm.reset();
      editTodoForm.classList.remove('invisible');
      delivery = new formStorage(element.index);

      console.log(projectsArray);
    });

    switch (element.priority) {
      case 'Low':
        todoWrapper.style.backgroundColor = 'rgb(214 255 226)';
        break;
      case 'Medium':
        todoWrapper.style.backgroundColor = 'rgb(255 237 214)';
        break;
      case 'High':
        todoWrapper.style.backgroundColor = 'rgb(255 214 214)';
        break;
    }

    todoWrapper.appendChild(checkTodo);
    todoWrapper.appendChild(todoName);
    todoWrapper.appendChild(todoDate);
    todoWrapper.appendChild(todoPriority);
    todoWrapper.appendChild(editTodoBtn);
    todoWrapper.appendChild(deleteTodoBtn);
    todoMainSpace.prepend(todoWrapper);
  });
});

addHover(addProjectBtn, '#f3f4f6', 'transparent');

submitProjectBtn.textContent = 'Add';
cancelProjectBtn.textContent = 'Cancel';
inputProject.setAttribute('placeholder', 'Enter project name');
inputProject.setAttribute('id', 'input-project');
newProjectWrapper.classList.add('new-project-wrapper');
submitProjectBtn.classList.add('submit-project');
cancelProjectBtn.classList.add('cancel-project');
addTodoBtn.textContent = 'Add Task';
addTodoBtn.classList.add('add-todo');

newProjectWrapper.appendChild(inputProject);
newProjectWrapper.appendChild(submitProjectBtn);
newProjectWrapper.appendChild(cancelProjectBtn);

addProjectBtn.addEventListener('click', () => {
  sidebar.append(newProjectWrapper);
});

submitProjectBtn.addEventListener('click', () => {
  const projectName = document.querySelector('#input-project').value;
  projectIndex = projectIndex + 1;

  let element = addProject(projectName, projectIndex);

  const projectMenuIconCopy = projectMenuIcon.cloneNode(true);
  const projectBtn = document.createElement('div');
  projectBtn.classList.add('project');
  projectBtn.textContent = projectName;
  const deleteProjectBtn = document.createElement('button');
  deleteProjectBtn.classList.add('delete-project');
  deleteProjectBtn.textContent = 'delete';
  projectBtn.prepend(projectMenuIconCopy);
  projectBtn.appendChild(deleteProjectBtn);
  projectMenuIconCopy.classList.remove('invisible');

  deleteProjectBtn.addEventListener('click', () => {
    deleteProject(element.index);
    projectBtnsArea.removeChild(projectBtn);

    console.log(projectsArray);
  });

  addHover(projectBtn, '#f3f4f6', 'transparent');

  switchProject(projectBtn, projectIndex);

  inputProject.value = '';
  sidebar.removeChild(newProjectWrapper);
  projectBtnsArea.prepend(projectBtn);

  console.log(projectsArray);
});

cancelProjectBtn.addEventListener('click', () => {
  sidebar.removeChild(newProjectWrapper);
});

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (todoForm.checkValidity() === false) {
    todoForm.reportValidity();
    return;
  } else {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const priority = document.querySelector('#priority').value;
    const date = document.querySelector('#date').value;

    todoIndex = todoIndex + 1;

    let element = addTodo(
      title,
      todoIndex,
      description,
      date,
      priority,
      currentProjectIndex
    );

    const todoWrapper = document.createElement('div');
    todoWrapper.classList.add('todo-wrapper');
    todoWrapper.setAttribute('id', `todo-${todoIndex}`);
    const checkTodo = document.createElement('input');
    checkTodo.setAttribute('type', 'checkbox');
    const todoName = document.createElement('p');
    todoName.setAttribute('id', `title-${todoIndex}`);
    todoName.textContent = element.title;
    const todoDate = document.createElement('p');
    todoDate.textContent = element.dueDate;
    todoDate.setAttribute('id', `date-${todoIndex}`);
    const todoPriority = document.createElement('p');
    todoPriority.textContent = element.priority;
    todoPriority.setAttribute('id', `priority-${todoIndex}`);
    const deleteTodoBtn = document.createElement('button');
    deleteTodoBtn.textContent = 'Delete';
    deleteTodoBtn.classList.add('delete-todo');
    const editTodoBtn = document.createElement('button');
    editTodoBtn.textContent = 'Edit';
    editTodoBtn.classList.add('edit-todo');

    checkTodo.addEventListener('click', () => {
      changeTodoStatus(element.index, currentProjectIndex);

      if (element.status == 'Complete') {
        checkTodo.checked = true;
        todoName.style.textDecorationLine = 'line-through';
        todoDate.style.textDecorationLine = 'line-through';
        todoPriority.style.textDecorationLine = 'line-through';
        todoWrapper.style.opacity = '0.8';
      } else {
        checkTodo.checked = false;
        todoName.style.textDecorationLine = 'none';
        todoDate.style.textDecorationLine = 'none';
        todoPriority.style.textDecorationLine = 'none';
        todoWrapper.style.opacity = '1';
      }
    });

    deleteTodoBtn.addEventListener('click', () => {
      deleteTodo(currentProjectIndex, element.index);
      todoMainSpace.removeChild(todoWrapper);
      console.log(projectsArray);
    });

    editTodoBtn.addEventListener('click', () => {
      todoForm.classList.add('invisible');
      todoForm.reset();
      editTodoForm.classList.remove('invisible');
      delivery = new formStorage(element.index);

      console.log(projectsArray);
    });

    console.log(element);

    switch (priority) {
      case 'Low':
        todoWrapper.style.backgroundColor = 'rgb(214 255 226)';
        break;
      case 'Medium':
        todoWrapper.style.backgroundColor = 'rgb(255 237 214)';
        break;
      case 'High':
        todoWrapper.style.backgroundColor = 'rgb(255 214 214)';
        break;
    }

    todoWrapper.appendChild(checkTodo);
    todoWrapper.appendChild(todoName);
    todoWrapper.appendChild(todoDate);
    todoWrapper.appendChild(todoPriority);
    todoWrapper.appendChild(editTodoBtn);
    todoWrapper.appendChild(deleteTodoBtn);
    todoMainSpace.prepend(todoWrapper);

    todoForm.reset();
    todoForm.classList.add('invisible');
    addTodoBtn.classList.remove('invisible');
  }
});

cancelNewTodoFormBtn.addEventListener('click', () => {
  todoForm.reset();
  addTodoBtn.classList.remove('invisible');
  todoForm.classList.add('invisible');
});

class formStorage {
  constructor(eIndex) {
    this.eIndex = eIndex;
  }

  get storage() {
    return this.eIndex;
  }
}

editTodoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (editTodoForm.checkValidity() === false) {
    editTodoForm.reportValidity();
    return;
  } else {
    const priority = document.querySelector('#edit-priority').value;
    const editTitle = document.querySelector('#edit-title').value;
    const editDescription = document.querySelector('#edit-description').value;
    const editPriority = document.querySelector('#edit-priority').value;
    const editDate = document.querySelector('#edit-date').value;

    let receiver = delivery.storage;

    const element = editTodo(
      projectIndex,
      editTitle,
      receiver,
      editDescription,
      editPriority,
      editDate,
      projectIndex
    );

    console.log(element);

    const todoWrapper = document.querySelector(`#todo-${element.index}`);
    const todoName = document.querySelector(`#title-${element.index}`);
    const todoDate = document.querySelector(`#date-${element.index}`);
    const todoPriority = document.querySelector(`#priority-${element.index}`);

    switch (priority) {
      case 'Low':
        todoWrapper.style.backgroundColor = 'rgb(214 255 226)';
        break;
      case 'Medium':
        todoWrapper.style.backgroundColor = 'rgb(255 237 214)';
        break;
      case 'High':
        todoWrapper.style.backgroundColor = 'rgb(255 214 214)';
        break;
    }

    todoName.textContent = element.title;
    todoDate.textContent = element.dueDate;
    todoPriority.textContent = element.priority;

    editTodoForm.reset();
    editTodoForm.classList.add('invisible');

    console.log(projectsArray);
  }
});

cancelEditTodoFormBtn.addEventListener('click', () => {
  editTodoForm.reset();
  editTodoForm.classList.add('invisible');
});

function renderAddTodo() {
  addTodoBtn.prepend(plusIconCopy);
  todoMainSpace.appendChild(addTodoBtn);

  addHover(addTodoBtn, '#f3f4f6', 'transparent');

  addTodoBtn.addEventListener('click', () => {
    editTodoForm.classList.add('invisible');
    editTodoForm.reset();
    todoForm.classList.remove('invisible');
    addTodoBtn.classList.add('invisible');
  });
}

function addHover(value, color1, color2) {
  value.addEventListener('mouseenter', () => {
    value.style.backgroundColor = color1;
  });

  value.addEventListener('mouseleave', () => {
    value.style.backgroundColor = color2;
  });
}

function switchProject(valueBtn, value) {
  valueBtn.addEventListener('click', () => {
    while (todoMainSpace.firstChild) {
      todoMainSpace.removeChild(todoMainSpace.lastChild);
    }

    currentProjectIndex = value;
    valueBtn.style.backgroundColor = '#7dd3fc';

    let projectStorage = getProject(currentProjectIndex);

    if (typeof projectStorage === 'object') {
      projectStorage.forEach((element) => {
        const todoWrapper = document.createElement('div');
        todoWrapper.classList.add('todo-wrapper');
        const checkTodo = document.createElement('input');
        checkTodo.setAttribute('type', 'checkbox');
        const todoName = document.createElement('p');
        todoName.textContent = element.title;
        const todoDate = document.createElement('p');
        todoDate.textContent = element.dueDate;
        const todoPriority = document.createElement('p');
        todoPriority.textContent = element.priority;
        const deleteTodoBtn = document.createElement('button');
        deleteTodoBtn.textContent = 'Delete';
        deleteTodoBtn.classList.add('delete-todo');
        const editTodoBtn = document.createElement('button');
        editTodoBtn.textContent = 'Edit';
        editTodoBtn.classList.add('edit-todo');

        if (element.status == 'Complete') {
          checkTodo.checked = true;
          todoName.style.textDecorationLine = 'line-through';
          todoDate.style.textDecorationLine = 'line-through';
          todoPriority.style.textDecorationLine = 'line-through';
          todoWrapper.style.opacity = '0.8';
        }

        checkTodo.addEventListener('click', () => {
          changeTodoStatus(element.index, currentProjectIndex);

          if (element.status == 'Complete') {
            checkTodo.checked = true;
            todoName.style.textDecorationLine = 'line-through';
            todoDate.style.textDecorationLine = 'line-through';
            todoPriority.style.textDecorationLine = 'line-through';
            todoWrapper.style.opacity = '0.8';
          } else {
            checkTodo.checked = false;
            todoName.style.textDecorationLine = 'none';
            todoDate.style.textDecorationLine = 'none';
            todoPriority.style.textDecorationLine = 'none';
            todoWrapper.style.opacity = '1';
          }
        });

        deleteTodoBtn.addEventListener('click', () => {
          deleteTodo(currentProjectIndex, element.index);
          todoMainSpace.removeChild(todoWrapper);
          console.log(projectsArray);
        });

        editTodoBtn.addEventListener('click', () => {
          todoForm.classList.add('invisible');
          todoForm.reset();
          editTodoForm.classList.remove('invisible');
          delivery = new formStorage(element.index);

          console.log(projectsArray);
        });

        switch (element.priority) {
          case 'Low':
            todoWrapper.style.backgroundColor = 'rgb(214 255 226)';
            break;
          case 'Medium':
            todoWrapper.style.backgroundColor = 'rgb(255 237 214)';
            break;
          case 'High':
            todoWrapper.style.backgroundColor = 'rgb(255 214 214)';
            break;
        }

        todoWrapper.appendChild(checkTodo);
        todoWrapper.appendChild(todoName);
        todoWrapper.appendChild(todoDate);
        todoWrapper.appendChild(todoPriority);
        todoWrapper.appendChild(editTodoBtn);
        todoWrapper.appendChild(deleteTodoBtn);
        todoMainSpace.prepend(todoWrapper);
      });
    }

    renderAddTodo();
  });
}
