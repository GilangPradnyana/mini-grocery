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
window.addEventListener('DOMContentLoaded', setupItems);

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
        // add to the databse
        addToLocalStorage(ID, value)
        // setb the submit form to default
        setBackDefault();
    } else if(value && editFlag) {
        editElement.innerHTML = value;
        editLocalStorage(ID, value)
        displayAlert('item has been edited', 'success');
        setBackDefault()
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
    localStorage.removeItem('list')
};
// delete Items 1 by 1
function deleteItem(e){
    const item = e.currentTarget.parentElement.parentElement;
    const id = item.dataset.id
    list.removeChild(item);
    if(list.children.length > 0) {
        displayAlert('item has been deleted', 'success');
    } else {
        displayAlert('item is empty now', 'danger');
        container.classList.remove('show-container');
    };
    setBackDefault();
    removeFromLocalStorage(id);
};
// edit the item
function editItem(e) {
    const item = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // change the value here
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = item.dataset.id
    // the button section
    submitBtn.textContent = 'Edit'
}




// ****** LOCAL STORAGE **********
// will use to add the item to the Database
function addToLocalStorage(id, value) {
    const element = {id, value};
    let item = getLocalStorage();
    item.push(element);
    // push the data to localStorage/Database
    localStorage.setItem('list', JSON.stringify(item));
};
// remove the items 1 by 1 in the Database
function removeFromLocalStorage(id) {
    let item = getLocalStorage();
    item = item.filter((items)=> {
        if(items.id !== id) {
            return items
        };
    });

    // add to the localStorage/Database
    localStorage.setItem('list', JSON.stringify(item));
};
// edit the items and change in the Database
function editLocalStorage(id, value) {
    let item = getLocalStorage();
    item = item.map((items)=> {
        if(items.id === id) {
            item.value = value;
        };
        return items;
    });
    // edit data in the Database
    localStorage.setItem('list', JSON.stringify(item));
}


// the acces to get into Database
function getLocalStorage() {
    return localStorage.getItem('list')? JSON.parse(localStorage.getItem('list')):[];
};

// ****** SETUP ITEMS **********
// to load the item when the window refreshed
function setupItems() {
    let item = getLocalStorage();
    // the decission
    if(item.length > 0) {
        item.forEach((items)=> {
            createListItems(items.id, items.value); // the parameter targeted to the function
        });
        container.classList.add('show-container');
    };
};
// create the list in dynamic way
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
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)
    // add to the list
    list.appendChild(element);
};