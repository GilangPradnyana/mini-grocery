// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');
const grocery = document.getElementById('grocery')
// edit option
let editElement;
let editID = '';
let editFlag = false;
// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItems);
clearBtn.addEventListener('click', clearItems);
// window.addEventListener('DOMContentLoaded', setupItems);

// ****** FUNCTIONS **********
function addItems(e) {
    e.preventDefault();
    // get the input value and the special ID
    const value = grocery.value;
    const ID = new Date().getTime().toString();
    // make the deccison for addItem, edit and nothing
    if(value && !editFlag) {
        createListItems(ID, value);
        // make the list visible
        container.classList.add('show-container');
        displayAlert('item has been added', 'success');
        setBackDefault();
    } else if(value && editFlag) {
        displayAlert('item has been edited', 'success');
    } else { 
        displayAlert('please add some value', 'danger');
    };
};

// make an Alert of the action that client will be doing
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // set the timeout
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000); 
};
// set back the form value to default before add some value again
function setBackDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
};
// clear all the items
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    items.forEach((item)=> {
        list.removeChild(item);
    });
    container.classList.remove('show-container');
};
// delete Items 1 by 1
function deleteItem(e){
    const item = e.currentTarget.parentElement.parentElement;
    list.removeChild(item);
    if(list.children.length > 0) {
        displayAlert('item has been deleted', 'success');
    } else {
        displayAlert('item is empty now', 'danger');
        container.classList.remove('show-container');
    };
    setBackDefault()
};




// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
function createListItems(ID, value) {
    const element = document.createElement('article');
    // add class
    element.classList.add('grocery-item');
    // add ID
    const attr = document.createAttribute('data-id');
    attr.value = ID;
    element.setAttributeNode(attr);
    // return the dynamic html
    element.innerHTML = ` <p class="title">${value}</p>
        <div class="btn-container">
          <!-- edit-btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>        
          '</button>
          <!-- trash btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>        
          </button>
        </div>`;
    
    // delete and edit btn
    const deleteBtn = element.querySelector('.delete-btn');
    // const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem)
    // editBtn.addEventListener('click', editItem)
    // add to the list
    list.appendChild(element);
};