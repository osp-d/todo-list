import { Project } from './todos.js';
import { Todo } from './todos.js';
import {
  addProject,
  renameProject,
  deleteProject,
  addTodo,
  projectsArray,
} from './todos.js';

const sidebar = document.querySelector('div.sidebar');
const main = document.querySelector('div.main');
const addProjectBtn = document.querySelector('button.add-project');

addHover(addProjectBtn, '#f3f4f6', 'transparent');

addProjectBtn.addEventListener('click', () => {
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
  sidebar.append(inputWrapper);

  addBtn.addEventListener('click', () => {
    const projectName = document.querySelector('input').value;
    addProject(projectName);

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('project');
    projectBtn.textContent = projectName;

    addHover(projectBtn, '#f3f4f6', 'transparent');

    renderAddTodo();
    //projectBtn.addEventListener('click', () => renderProject())

    sidebar.removeChild(inputWrapper);
    sidebar.prepend(projectBtn);

    console.log(projectsArray);
  });

  cancelBtn.addEventListener('click', () => {
    sidebar.removeChild(inputWrapper);
  });
});

function renderAddTodo() {
  const addTodoBtn = document.createElement('button');
  addTodoBtn.textContent = 'Add Task';
  addTodoBtn.classList.add('add-todo');
  main.appendChild(addTodoBtn);

  addHover(addTodoBtn, '#f3f4f6', 'transparent');

  addTodoBtn.addEventListener('click', () => {
    document.querySelector('div.todo-form').classList.remove('invisible');
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
