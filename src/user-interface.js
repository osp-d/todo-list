import {
  addProject,
  renameProject,
  deleteProject,
  addTodo,
  showTodo,
  changeTodoStatus,
  projectsArray,
} from './todos.js';

// import { Todo } from './todos.js';
// import { Project } from './todos.js';

// Creating DOM elements

let currentProject;

const sidebar = document.querySelector('div.sidebar');
// const main = document.querySelector('div.main');
const addProjectBtn = document.querySelector('button.add-project');
const todoForm = document.querySelector('form.todo-form');
const cancelFormBtn = document.querySelector('input.cancel');
const projectMenuIcon = document.querySelector('svg.menu');
const newProjectWrapper = document.createElement('div');
const inputProject = document.createElement('input');
const submitProjectBtn = document.createElement('button');
const cancelProjectBtn = document.createElement('button');
const addTodoBtn = document.createElement('button');
const plusIcon = document.querySelector('svg.plus');
const plusIconCopy = plusIcon.cloneNode(true);
const todoMainSpace = document.querySelector('div.content');

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
  addProject(projectName);

  const projectMenuIconCopy = projectMenuIcon.cloneNode(true);
  const projectBtn = document.createElement('button');
  projectBtn.classList.add('project');
  projectBtn.textContent = projectName;
  projectBtn.prepend(projectMenuIconCopy);
  projectMenuIconCopy.classList.remove('invisible');

  addHover(projectBtn, '#f3f4f6', 'transparent');

  switchProject(projectBtn, projectName);

  inputProject.value = '';
  sidebar.removeChild(newProjectWrapper);
  sidebar.prepend(projectBtn);

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
    const priority = document.querySelector('select').value;
    const date = document.querySelector('#date').value;

    let element = addTodo(title, description, date, priority, currentProject);

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

    checkTodo.addEventListener('click', () => {
      changeTodoStatus(title, currentProject);

      if (element.status == 'Complete') {
        checkTodo.checked = true;
        todoWrapper.style.textDecorationLine = 'line-through';
        todoWrapper.style.opacity = '0.8';
      } else {
        checkTodo.checked = false;
        todoWrapper.style.textDecorationLine = 'none';
        todoWrapper.style.opacity = '1';
      }
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
    todoMainSpace.prepend(todoWrapper);

    todoForm.reset();
    todoForm.classList.add('invisible');
    addTodoBtn.classList.remove('invisible');
  }
});

cancelFormBtn.addEventListener('click', () => {
  todoForm.reset();
  addTodoBtn.classList.remove('invisible');
  todoForm.classList.add('invisible');
});

function renderAddTodo() {
  addTodoBtn.prepend(plusIconCopy);
  todoMainSpace.appendChild(addTodoBtn);

  addHover(addTodoBtn, '#f3f4f6', 'transparent');

  addTodoBtn.addEventListener('click', () => {
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

    currentProject = value;
    valueBtn.style.backgroundColor = '#7dd3fc';

    let projectStorage = showTodo(currentProject);
    projectStorage.forEach((element) => {
      const todoWrapper = document.createElement('div');
      todoWrapper.classList.add('todo-wrapper');
      const checkTodo = document.createElement('input');
      checkTodo.setAttribute('type', 'checkbox');
      const todoName = document.createElement('p');
      todoName.textContent = element.title;
      const todoDate = document.createElement('p');
      todoDate.textContent = element.dueDate;

      if (element.status == 'Complete') {
        checkTodo.checked = true;
        todoWrapper.style.textDecorationLine = 'line-through';
        todoWrapper.style.opacity = '0.8';
      }

      checkTodo.addEventListener('click', () => {
        changeTodoStatus(element.title, currentProject);

        if (element.status == 'Complete') {
          checkTodo.checked = true;
          todoWrapper.style.textDecorationLine = 'line-through';
          todoWrapper.style.opacity = '0.8';
        } else {
          checkTodo.checked = false;
          todoWrapper.style.textDecorationLine = 'none';
          todoWrapper.style.opacity = '1';
        }
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
      todoMainSpace.prepend(todoWrapper);
    });

    renderAddTodo();
  });
}
