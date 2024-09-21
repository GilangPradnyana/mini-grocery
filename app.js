// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('grocery-list');
const clearBtn = document.querySelector('.clear-btn');
const grocery = document.getElementById('grocery')
// edit option
let editElement;
let editID = '';
let editFlag = false;
// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItems);
// clearBtn.addEventListener('click', clearItems);
// window.addEventListener('DOMContentLoaded', setupItems);

// ****** FUNCTIONS **********
function addItems(e) {
    e.preventDefault();
    // get the input value and the special ID
    const value = grocery.value;
    const ID = new Date().getTime().toString();
    // make the deccison for addItem, edit and nothing
    if(value && !editFlag) {
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


// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********