// Import the express module, which is a web application framework for Node.js
const express = require("express");
// Import the custom-built file manager module filemgr.js for reading and writing data
const fm = require("./filemgr");

// Create an instance of the express application
const app = express();

// Use built-in middleware to serve static files from the Client directory
app.use(express.static("./Client"));
// Use built-in middleware to parse incoming JSON requests
app.use(express.json());

// Define an HTTP GET route to handle requests for reading data from the file
app.get("/api", async (req, res) => {
  try {
    // Read the data from the file using the custom file manager
    const data = await fm.ReadData();
    // Send the data as a JSON response
    res.json(data);
  } 
  catch (error) {
    // If an error occurs, send a 500 status code and an error message
    res.status(500).send("Error reading list.");
  }
});

// Define an HTTP POST route to handle requests for updating data in the file
app.post("/api", async (req, res) => {
  try {
    // Attempt to write the request body data to the file using the WriteData function from the file manager module
    await fm.WriteData(req.body);
    // If successful, send a 200 status code and a JSON response indicating that the data was saved
    res.status(200).json({ message: "Data saved" });
  } 
  catch (error) {
    // If an error occurs during the writing process, send a 500 status code and a JSON response indicating the error
    res.status(500).json({ error: "Error writing data" });
  }
});

// Define a catch-all route to handle requests to undefined routes
app.all("*", (req, res) => {
  // Send a 404 status code and a "Page Not Found" message
  res.status(404).send("<h1>Page Not Found...</h1>");
});

// Define the application name for logging purposes
const appName = "Simple List";
// Define the port number on which the server will listen for requests
const port = 5000;
// Start the server and have it listen on the defined port
app.listen(port, () => {
  // Log a message indicating that the server is running and listening on the specified port
  console.log(`App ${appName} is running on port ${port}`);
});
