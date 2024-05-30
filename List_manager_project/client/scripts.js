const http = new coreHTTP;

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
  console.log("ShowList() called");
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  console.log("Output:", output);
  result.innerHTML = output;
}

async function GetList() {
  try {
    const listData = await http.get("/api");
    theList = listData;
    ShowList();
  } 
  catch (error) {
    console.error("Error fetching list:", error);
    result.innerHTML = "Error fetching list.";
  }
}

async function WriteList() {
  try {
    const response = await http.post("/api", theList);
    console.log("Server Response:", response);  
    if (response.message === "Data saved") {
      ShowList(); 
    }
  } catch (error) {
    console.error("Error writing list:", error);
    result.innerHTML = "Error writing list.";
  }
}

/* Listener Functions */
async function httpPost(e) {
  e.preventDefault();
  const newItem = input.value.trim();
  if (newItem) {
    theList.push(newItem);
    ShowList();
    input.value = "";
    await WriteList();
  }
}

async function httpDelete(e) {
  e.preventDefault();
  const itemToDelete = input.value.trim();

  if (itemToDelete === "") {  
    theList.pop();
    console.log("Deleted last item on the list")
    ShowList();
  } else {
    const index = theList.indexOf(itemToDelete);
    if (index > -1) {
      theList.splice(index, 1); 
      ShowList();
    } else {
      alert(`Item "${itemToDelete}" not found in the list.`);
      return;
    }
  }

  await WriteList();
  input.value = ""; 
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
