import {
  addProject,
  renameProject,
  deleteProject,
  addTodo,
  showTodo,
  changeTodoStatus,
  deleteTodo,
  allTodosArray,
  projectsArray,
} from './todos.js';

// import { Todo } from './todos.js';
// import { Project } from './todos.js';

// Creating DOM elements

let currentProject;
let todoIndex = 0;
let projectIndex = 0;

const sidebar = document.querySelector('div.sidebar');
const projectBtnsArea = document.querySelector('div.user-projects');
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

    if (element.status == 'Complete') {
      checkTodo.checked = true;
      todoName.style.textDecorationLine = 'line-through';
      todoDate.style.textDecorationLine = 'line-through';
      todoPriority.style.textDecorationLine = 'line-through';
      todoWrapper.style.opacity = '0.8';
    }

    checkTodo.addEventListener('click', () => {
      changeTodoStatus(element.index, currentProject);

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
    const priority = document.querySelector('select').value;
    const date = document.querySelector('#date').value;

    todoIndex = todoIndex + 1;

    let element = addTodo(
      title,
      todoIndex,
      description,
      date,
      priority,
      currentProject
    );

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

    checkTodo.addEventListener('click', () => {
      changeTodoStatus(todoIndex, currentProject);

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
      deleteTodo(currentProject, element.index);
      todoMainSpace.removeChild(todoWrapper);
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
    todoWrapper.appendChild(deleteTodoBtn);
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

        if (element.status == 'Complete') {
          checkTodo.checked = true;
          todoName.style.textDecorationLine = 'line-through';
          todoDate.style.textDecorationLine = 'line-through';
          todoPriority.style.textDecorationLine = 'line-through';
          todoWrapper.style.opacity = '0.8';
        }

        checkTodo.addEventListener('click', () => {
          changeTodoStatus(element.index, currentProject);

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
          deleteTodo(currentProject, element.index);
          todoMainSpace.removeChild(todoWrapper);
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
        todoWrapper.appendChild(deleteTodoBtn);
        todoMainSpace.prepend(todoWrapper);
      });
    }

    renderAddTodo();
  });
}
