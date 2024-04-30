import {
  addProject,
  renameProject,
  deleteProject,
  addTodo,
  showTodo,
  projectsArray,
} from './todos.js';

const sidebar = document.querySelector('div.sidebar');
const main = document.querySelector('div.main');
const addProjectBtn = document.querySelector('button.add-project');
const form = document.querySelector('form.todo-form');
const cancelFormBtn = document.querySelector('input.cancel');
const menuIcon = document.querySelector('svg.menu');

let currentProject;

addHover(addProjectBtn, '#f3f4f6', 'transparent');

const inputWrapper = document.createElement('div');
const inputProject = document.createElement('input');
const addBtn = document.createElement('button');
const cancelBtn = document.createElement('button');

addBtn.textContent = 'Add';
cancelBtn.textContent = 'Cancel';
inputProject.setAttribute('placeholder', 'Enter project name');
inputWrapper.classList.add('input-wrapper');
addBtn.classList.add('add');
cancelBtn.classList.add('cancel');

inputWrapper.appendChild(inputProject);
inputWrapper.appendChild(addBtn);
inputWrapper.appendChild(cancelBtn);

addProjectBtn.addEventListener('click', () => {
  sidebar.append(inputWrapper);
});

addBtn.addEventListener('click', () => {
  const projectName = document.querySelector('input').value;
  addProject(projectName);

  let menuIconCopy = menuIcon.cloneNode(true);

  const projectBtn = document.createElement('button');
  projectBtn.classList.add('project');
  projectBtn.textContent = projectName;
  projectBtn.prepend(menuIconCopy);
  menuIconCopy.classList.remove('invisible');

  addHover(projectBtn, '#f3f4f6', 'transparent');

  projectBtn.addEventListener('click', () => {
    currentProject = projectName;
    projectBtn.style.backgroundColor = '#7dd3fc';

    console.log(currentProject);
  });

  renderAddTodo();

  inputProject.value = '';
  sidebar.removeChild(inputWrapper);
  sidebar.prepend(projectBtn);

  console.log(projectsArray);
});

cancelBtn.addEventListener('click', () => {
  sidebar.removeChild(inputWrapper);
});

const addTodoBtn = document.createElement('button');
addTodoBtn.textContent = 'Add Task';
addTodoBtn.classList.add('add-todo');
const icon = document.querySelector('svg.plus');
const iconCopy = icon.cloneNode(true);

function renderAddTodo() {
  addTodoBtn.prepend(iconCopy);
  main.appendChild(addTodoBtn);

  addHover(addTodoBtn, '#f3f4f6', 'transparent');

  addTodoBtn.addEventListener('click', () => {
    form.classList.remove('invisible');
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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (form.checkValidity() === false) {
    form.reportValidity();
    return;
  } else {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const date = document.querySelector('#date').value;

    addTodo(title, description, date, 'medium', currentProject);
    showTodo(currentProject);

    form.reset();
    form.classList.add('invisible');
    addTodoBtn.classList.remove('invisible');
  }
});

cancelFormBtn.addEventListener('click', () => {
  form.reset();
  addTodoBtn.classList.remove('invisible');
  form.classList.add('invisible');
});
