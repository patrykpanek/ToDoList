let todoInput,
  errorInfo,
  addBtn,
  ulList,
  popup,
  popupInfo,
  todoEdit,
  popupInput,
  popupAddBtn,
  popupCloseBtn;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  todoInput = document.querySelector('.todo-input');
  errorInfo = document.querySelector('.error-info');
  addBtn = document.querySelector('.btn-add');
  ulList = document.querySelector('.todolist ul');

  popup = document.querySelector('.popup');
  popupInfo = document.querySelector('.popup-info');
  popupInput = document.querySelector('.popup-input');
  popupAddBtn = document.querySelector('.accept');
  popupCloseBtn = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
  addBtn.addEventListener('click', addNewTodo);
  ulList.addEventListener('click', checkClick);
  popupCloseBtn.addEventListener('click', closePopup);
  popupAddBtn.addEventListener('click', changeTodoText);
  todoInput.addEventListener('keyup', enterKeyCheck);
};

const addNewTodo = () => {
  if (todoInput.value !== '') {
    const newTodo = document.createElement('li');
    newTodo.textContent = todoInput.value;
    createToolsArea(newTodo);

    ulList.append(newTodo);

    todoInput.value = '';
    errorInfo.textContent = '';
  } else {
    errorInfo.textContent = 'Enter the task text...';
  }
};

const createToolsArea = (newTodo) => {
  const toolsPanel = document.createElement('div');
  toolsPanel.classList.add('tools');
  newTodo.append(toolsPanel);

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete');
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit');
  editBtn.textContent = 'EDIT';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
  if (e.target.matches('.complete')) {
    e.target.closest('li').classList.toggle('completed');
    e.target.classList.toggle('completed');
  } else if (e.target.matches('.edit')) {
    editTodo(e);
  } else if (e.target.matches('.delete')) {
    deleteTodo(e);
  }
};

const editTodo = (e) => {
  todoEdit = e.target.closest('li');
  popupInput.value = todoEdit.firstChild.textContent;
  console.log(todoEdit.firstChild);
  popup.style.display = 'flex';
};

const closePopup = () => {
  popup.style.display = 'none';
  popupInfo.textContent = '';
};

const changeTodoText = () => {
  if (popupInput.value !== '') {
    todoEdit.firstChild.textContent = popupInput.value;
    popup.style.display = 'none';
    popupInfo.textContent = '';
  } else {
    popupInfo.textContent = 'Enter the task text...';
  }
};

const deleteTodo = (e) => {
  e.target.closest('li').remove();

  const allTodos = document.querySelectorAll('li');

  if (allTodos.length === 0) {
    errorInfo.textContent = 'No tasks on the list...';
  }
};

const enterKeyCheck = (e) => {
  if (e.key === 'Enter') {
    addNewTodo();
  }
};

document.addEventListener('DOMContentLoaded', main);
