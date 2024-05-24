// Instantiate the object
// const http = new coreHTTP;

// Instantiate the library class as http for making HTTP requests.
const http = new library();

// Function to display the response data in the HTML document
function ShowResponse(responseData) {
  // Initialize an HTML string for displaying the response in an unordered list.
  let html = "<ul style='list-style:none'>";

  // Check if the responseData is a string.
  if (typeof responseData === "string") {
    // If its a string, create a list item with the response data.
    html += `<li>${responseData}</li>`;
  } 
  // Else if its an array, iterate over each user object.
  else if (Array.isArray(responseData)) {
    // Create a list item for each user with their id, name, and email.
    responseData.forEach(user => {
      html += `<li>User ${user.id} - ${user.name} - ${user.email}</li>`;
    })
  } 
  // Else its a single object, create a list item with the users id, name, and email.
  else {
    html += `<li>User ${responseData.id} - ${responseData.name} - ${responseData.email}</li>`;
  }
  // Set the innerHTML of the response container to the generated HTML.
  document.querySelector("#response").innerHTML = html;
}

// Function to send an HTTP request of the specified type to the given URL with optional data
function sendRequest(reqType, targetURL, data) {
  // Determine the type of HTTP request to send based on reqType.
  switch (reqType) {
    // For GET requests
    case "get":
      // Call the get method of the http object.
      http.get(targetURL); 
      break;
    // For POST requests
    case "post":
      // Call the post method of the http object with data. 
      http.post(targetURL, data); 
      break;
    // For PUT requests
    case "put":
      // Call the put method of the http object with data. 
      http.put(targetURL, data); 
      break;
    // For PATCH requests
    case "patch":
      // Call the patch method of the http object with data. 
      http.patch(targetURL, data); 
      break;
    // For DELETE requests
    case "delete":
      // Call the delete method of the http object.
      http.delete(targetURL); 
      break;            
  }
}

// Function to validate the id input field to ensure it contains a value
function ValidId(id, required = false) {
  let isValid;
  // Check if the id length is greater than 0.
  if (id.length > 0) {
    isValid = (Number.isInteger(Number(id)))
    // Check if the id is an integer and within the range 1 to 10.
    if (isValid) {
      isValid = ((Number(id) >= 1 && Number(id) < 11));
    }
  }
  // Else if id is required and not provided, set isValid to false. 
  else if (required) {
    isValid = false;
  }
  // Else id is not required, set isValid to true. 
  else {
    isValid = true;
  }
  // If the id is not valid, indicate the error in the input field.
  if (!isValid) {
    document.querySelector("#uIdArea>input").style.border = "2px solid red";
    document.querySelector("#uIdArea>input").value = "Error!";
  }
  // Return the validation result.
  return isValid; 
}

// Function to validate the username input field to ensure it contains a value
function ValidName(fullName) {
  let isValid = true;
  // Check if the fullName length is not greater than 0.
  if (!fullName.length > 0) {
    // If not, set isValid to false and indicate the error in the input field.
    isValid = false;
    document.querySelector("#uNameArea>input").style.border = "2px solid red";
    document.querySelector("#uNameArea>input").placeholder = "Name required!";
  }
  // Return the validation result.
  return isValid; 
}

// Function to validate the email input field to ensure it contains a value
function ValidEmail(email) {
  let isValid = true;
  // Check if the email length is not greater than 0.
  if (!email.length > 0) {
    // If not, set isValid to false and indicate the error in the input field.
    isValid = false;
    document.querySelector("#uMailArea>input").style.border = "2px solid red";
    document.querySelector("#uMailArea>input").placeholder = "Email required!";
  }
  // Return the validation result.
  return isValid; 
}

// Function to prepare and send the appropriate HTTP request based on the user's input
function SetupRequest() {
  // Get the route value from the input field.
  let route = document.querySelector("#route").value;
  // Initialize an empty object to store the data for the request.
  let data = {};

  // Get all radio buttons with name HTTPtype.
  const radioButtons = document.querySelectorAll("input[name='HTTPtype'");
  let reqType;
  // Find the checked radio button and get its value.
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      reqType = radioButton.value;
      break;
    }
  }

  // Form the URL and request
  // Determine the validity of the input and set up the request based on reqType.
  let okToSend;

  // If http request type is get
  if (reqType === "get") {
    // Clear the name input field.
    document.querySelector("#uNameArea>input").value = "";
    // Validate the id and set okToSend based on the result.
    okToSend = (ValidId(document.querySelector("#uIdArea>input").value));
  }

  // If http request type is post
  if (reqType === "post") {
    // Clear the id input field.
    document.querySelector("#uIdArea>input").value = "";
    // Get the values from the name and email input fields.
    let uFullName = document.querySelector("#uNameArea>input").value;
    let uMail = document.querySelector("#uMailArea>input").value;
    // Validate the name and email.
    if (ValidName(uFullName) && ValidEmail(uMail)) {
      // Set up the data object with the name, username, and email.
      data = {
        name: uFullName,
        email: uMail
      };
      // Set okToSend to true if validation passes.
      okToSend = true; 
    };
  }

  // If http request type is put or patch
  if (reqType === "put" || reqType === "patch") {
    // Initialize okToSend as false.
    okToSend = false; 
    // Validate the id and ensure its required.
    if (ValidId(document.querySelector("#uIdArea>input").value,true)) {
      // Get the values from the name and email input fields.
      let uFullName = document.querySelector("#uNameArea>input").value;
      let uMail = document.querySelector("#uMailArea>input").value;
      // Validate the name and email based on the request type.
      if ((ValidName(uFullName) && ValidEmail(uMail)) || (reqType === "patch" && ValidEmail(uMail)) || (reqType === "patch" && ValidName(uFullName))) {
        // Set up the data object with the provided values.
        data = {
          // Includes name only if provided
          name: uFullName || undefined, 
          // Includes email only if provided
          email: uMail || undefined
        };
        // Set okToSend to true if validation passes.
        okToSend = true; 
      };
    }
  }

  // If http request type is delete
  if (reqType === "delete") {
    // Clear the name input field.
    document.querySelector("#uNameArea>input").value = "";
    // Validate the id and set okToSend based on the result.
    okToSend = (ValidId(document.querySelector("#uIdArea>input").value,true));
  };
  
  // If okToSend is true
  if (okToSend) {
    // Append the id to the route.
    route = route.concat(document.querySelector("#uIdArea>input").value);
    // Reset the input fields styles to default.
    document.querySelector("#uIdArea>input").style.border = "1px solid lightgrey";
    document.querySelector("#uNameArea>input").style.border = "1px solid lightgrey";
    document.querySelector("#uMailArea>input").style.border = "1px solid lightgrey";
    // Send the request with the specified type, URL, and data.
    sendRequest(reqType, route, data);
    // Clear the input fields.
    document.querySelector("#uIdArea>input").value = "";
    document.querySelector("#uNameArea>input").value = "";
    document.querySelector("#uMailArea>input").value = "";
  } 
  else {
    // Log an error message if inputs are invalid.
    console.log("Input Error"); 
  }
}

// Function to configure the display of input fields based on the selected HTTP request type
function SetupInput(reqType) {
  // Switch statement to handle different request types
  switch (reqType) {
    // Case for get request
    case "get":
      // Display the user ID input area by setting its display style to flex
      document.querySelector("#uIdArea").style.display = "flex";
      // Hide the user name input area by setting its display style to none
      document.querySelector("#uNameArea").style.display = "none";
      // Hide the user email input area by setting its display style to none
      document.querySelector("#uMailArea").style.display = "none";
      break;
    // Case for post request
    case "post":
      // Hide the user ID input area by setting its display style to none
      document.querySelector("#uIdArea").style.display = "none";
      // Display the user name input area by setting its display style to flex
      document.querySelector("#uNameArea").style.display = "flex";
      // Display the user email input area by setting its display style to flex
      document.querySelector("#uMailArea").style.display = "flex";
      break;
    // Case for put request
    case "put":
      // Display the user ID input area by setting its display style to flex
      document.querySelector("#uIdArea").style.display = "flex";
      // Display the user name input area by setting its display style to flex
      document.querySelector("#uNameArea").style.display = "flex";
      // Display the user email input area by setting its display style to flex
      document.querySelector("#uMailArea").style.display = "flex";
      break;
    // Case for patch request
    case "patch":
      // Display the user ID input area by setting its display style to flex
      document.querySelector("#uIdArea").style.display = "flex";
      // Display the user name input area by setting its display style to flex
      document.querySelector("#uNameArea").style.display = "flex";
      // Display the user email input area by setting its display style to flex
      document.querySelector("#uMailArea").style.display = "flex";
      break;
    // Case for delete request
    case "delete":
      // Display the user ID input area by setting its display style to flex
      document.querySelector("#uIdArea").style.display = "flex";
      // Hide the user name input area by setting its display style to none
      document.querySelector("#uNameArea").style.display = "none";
      // Hide the user email input area by setting its display style to none
      document.querySelector("#uMailArea").style.display = "none";
      break;
  }
}

// Function to initialize the application and set up event listeners for user interactions
function StartUp() {
  // Set the initial input state by selecting the GET radio button
  document.querySelector("#rbGet").checked = true;
  // Configure the input fields to match the GET request type
  SetupInput("get");
  
  // Add event listeners for the radio buttons to handle changes in the selected request type
  // When the GET radio button is changed, configure the inputs for GET requests
  document.querySelector("#rbGet").addEventListener("change", () => SetupInput("get"));
  // When the POST radio button is changed, configure the inputs for POST requests
  document.querySelector("#rbPost").addEventListener("change", () => SetupInput("post"));
  // When the PUT radio button is changed, configure the inputs for PUT requests
  document.querySelector("#rbPut").addEventListener("change", () => SetupInput("put"));
  // When the PATCH radio button is changed, configure the inputs for PATCH requests
  document.querySelector("#rbPatch").addEventListener("change", () => SetupInput("patch"));
  // When the DELETE radio button is changed, configure the inputs for DELETE requests
  document.querySelector("#rbDelete").addEventListener("change", () => SetupInput("delete"));

  // Add an event listener to the SEND button to handle the click event
  // When the SEND button is clicked, execute the SetupRequest function
  document.querySelector("#SendReq").addEventListener("click", (e) => {
    // Prepare and send the request based on the current input values
    SetupRequest();
    // Prevent the default form submission behavior
    e.preventDefault();
  });
};

// When the window loads, execute the StartUp function.
window.onload = function() {
  StartUp();
}

