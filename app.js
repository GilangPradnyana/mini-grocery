// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const submitBtn = document.querySelector('submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('grocery-list');
const clearBtn = document.querySelector('.clear-btn');
const grocery = document.getElementById('grocery')
// edit option
let editElement;
let editID = ''
let editFlag = false;
// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItems);
// clearBtn.addEventListener('click', clearItems);
// window.addEventListener('DOMContentLoaded', setupItems);

// ****** FUNCTIONS **********

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********