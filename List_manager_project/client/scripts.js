const http = new coreHTTP;
//const {ReadData, WriteData} = require(`/List_manager_project/filemgr.js`);

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}



async function GetList() {
  try { 
    theList[0] = await fetch(`/api`);
    // const response = await fetch(`List_manager_project/filemgr.js/ReadData`);
    // theList[0] = response;
    ShowList(theList);
  }
  catch (error) {
    console.log(error);
  }
}

async function WriteList() {  
  try{
    await WriteData(theList);
  }catch (error) {
    console.log(error);
  }
}

/* Listener Functions */
async function httpPost(e) {
  e.preventDefault();
  const newItem = input.value.trim();
  if (newItem) {
    theList.push(newItem);
    input.value = '';
    await WriteList();
  }
}

async function httpDelete(e) {
  e.preventDefault();
  const itemToDelete = input.value.trim();
  if (itemToDelete) {
    theList = theList.filter(itm => itm !== itemToDelete);
    input.value = '';
    await WriteList();
  }
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();