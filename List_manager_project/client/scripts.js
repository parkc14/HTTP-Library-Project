// Create an instance of coreHTTP to handle HTTP requests
const http = new coreHTTP;

// Initialize an empty array to hold the list items
let theList = [];

// Set up selectors to get references to HTML elements
const result = document.querySelector(".result");
const input = document.querySelector("#listitem");
const addButton = document.querySelector(".add-btn");
const delButton = document.querySelector(".del-btn");

// Add event listeners to the buttons to handle click events
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */

// Function to display the list on the page
function ShowList() {
  // Log the call to ShowList for debugging
  console.log("ShowList() called");
  // Start building the HTML for the list
  let output = "<ul>";
  // Loop through each item in theList and add it to the HTML
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  // Close the HTML list tag
  output += "</ul>";
  // Log the final output HTML for debugging
  console.log("Output:", output);
  // Set the inner HTML of the result element to display the list
  result.innerHTML = output;
}

// Function to fetch the list data from the server
async function GetList() {
  try {
    // Make a GET request to the server to fetch the list data
    const listData = await http.get("/api");
    // Assign the fetched data to theList
    theList = listData;
    // Call ShowList to display the fetched list
    ShowList();
  } 
  catch (error) {
    // Log any errors that occur during the fetch
    console.error("Error fetching list:", error);
    // Display an error message if the fetch fails
    result.innerHTML = "Error fetching list.";
  }
}

// Function to send the updated list data to the server
async function WriteList() {
  try {
    // Make a POST request to the server with the updated list data
    const response = await http.post("/api", theList);
    // Log the server response for debugging
    console.log("Server Response:", response);
    // If the server response indicates success, call ShowList to update the display
    if (response.message === "Data saved") {
      ShowList();
    }
  } 
  catch (error) {
    // Log any errors that occur during the post request
    console.error("Error writing list:", error);
    // Display an error message if the post request fails
    result.innerHTML = "Error writing list.";
  }
}

/* Listener Functions */

// Function to handle the add button click event
async function httpPost(e) {
  // Prevent the default form submission behavior
  e.preventDefault();
  // Get the value from the input field and trim any extra spaces
  const newItem = input.value.trim();
  // Check if the input field is not empty
  if (newItem) {
    // Add the new item to the list
    theList.push(newItem);
    // Update the display with the new list
    ShowList();
    // Clear the input field
    input.value = "";
    // Send the updated list to the server
    await WriteList();
  }
}

// Function to handle the delete button click event
async function httpDelete(e) {
  // Prevent the default form submission behavior
  e.preventDefault();
  // Get the value from the input field and trim any extra spaces
  const itemToDelete = input.value.trim();
  // Check if the input field is empty
  if (itemToDelete === "") {
    // Remove the last item from the list if no specific item is specified
    theList.pop();
    // Log the action for debugging
    console.log("Deleted last item on the list");
    // Update the display with the new list
    ShowList();
  } 
  else {
    // Find the index of the item to delete
    const index = theList.indexOf(itemToDelete);
    // Check if the item exists in the list
    if (index > -1) {
      // Remove the item from the list
      theList.splice(index, 1);
      // Update the display with the new list
      ShowList();
    } 
    else {
      // Alert the user if the item was not found
      alert(`Item "${itemToDelete}" not found in the list.`);
      return;
    }
  }
  // Send the updated list to the server
  await WriteList();
  // Clear the input field
  input.value = "";
}

// Function to display a loading message
function showLoading() {
  // Set the inner HTML of the result element to show a loading message
  result.innerHTML = "Loading...";
}

// Main function to initialize the application
async function main() {
  // Disable the add and delete buttons while loading
  addButton.disabled = true;
  delButton.disabled = true;
  // Show the loading message
  showLoading();
  // Fetch the initial list data from the server
  await GetList();
  // Enable the add and delete buttons after loading
  addButton.disabled = false;
  delButton.disabled = false;
}

// Call the main function to start the application
main();
