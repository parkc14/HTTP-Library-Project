// Import the fs/promises module which provides file system operations that return promises
const fs = require("fs/promises")

// Define an asynchronous function to read data from a file
async function ReadData() {
  try {
    // Check if the file listdata.json is accessible (exists and readable)
    await fs.access("listdata.json");
    // Read the contents of the file listdata.json
    const data = await fs.readFile("listdata.json");
    // Parse the file contents from JSON format and return it
    return JSON.parse(data);
  } 
  catch (error) {
    // If an error occurs (file not found), return an empty array
    return [];
  }
}

// Define an asynchronous function to write data to a file
async function WriteData(dataOut) {
  try {
    // Write the given data to the file listdata.json in JSON format
    await fs.writeFile("listdata.json", JSON.stringify(dataOut));
  } 
  catch (error) {
    // If an error occurs while writing, throw a new error with a message
    throw new Error("Error writing data");
  }
}

// Export the ReadData and WriteData functions so they can be used in other modules
exports.ReadData = ReadData;
exports.WriteData = WriteData;