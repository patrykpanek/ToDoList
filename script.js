// const completeBtn = document.createElement('button');
//   completeBtn.classList.add('complete');
//   completeBtn.innerHTML = '<i class="fas fa-check"></i>';

//   const editBtn = document.createElement('button');
//   editBtn.classList.add('edit');
//   editBtn.textContent = 'EDIT';

//   const deleteBtn = document.createElement('button');
//   deleteBtn.classList.add('delete');
//   deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

let todoInput,
  errorInfo,
  addBtn,
  ulList,
  popup,
  popupInfo,
  todoEdit,
  popupInput,
  popupAddBtn,
  popupCloseBtn,
  test;

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
  todoInput.addEventListener('keyup', enterKeyCheck);
  addBtn.addEventListener('click', addNewTodo);
  ulList.addEventListener('click', checkClick);
  popupAddBtn.addEventListener('click', changeInput);
  popupCloseBtn.addEventListener('click', closeForm);
};

const addNewTodo = () => {
  if (todoInput.value !== '') {
    const newTodo = document.createElement('li');
    newTodo.textContent = todoInput.value;
    arenaTools(newTodo);

    ulList.appendChild(newTodo);
    todoInput.value = '';
    errorInfo.textContent = '';
  } else {
    errorInfo.textContent = 'Wpisz coś!';
  }
};

const arenaTools = (newTodo) => {
  const tool = document.createElement('div');
  tool.classList.add('tools');
  newTodo.appendChild(tool);

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete');
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit');
  editBtn.textContent = 'EDIT';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  tool.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
  if (e.target.matches('.complete')) {
    e.target.closest('li').classList.toggle('completed');
    // console.log(e.target.closest('li').innerHTML);
    e.target.classList.toggle('completed');
  } else if (e.target.matches('.edit')) {
    editInput(e);
  } else if (e.target.matches('.delete')) {
    deletePosition(e);
  }
};

const editInput = (e) => {
  test = e.target.closest('li');
  // li.childNodes[0].textContent;
  popup.style.display = 'flex';
  popupInput.value = test.childNodes[0].textContent;
};

const changeInput = () => {
  if (popupInput.value !== '') {
    test.childNodes[0].textContent = popupInput.value;
    popup.style.display = 'none';
    popupInfo.textContent = '';
  } else {
    popupInfo.textContent = 'Uzupełnij pola';
  }
};

const closeForm = () => {
  popup.style.display = 'none';
  popupInfo.textContent = '';
  popupInput.value = '';
};

const deletePosition = (e) => {
  todoEdit = e.target.closest('li');
  todoEdit.remove();

  let allTodos = document.querySelectorAll('li');

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
