// Initialize library of type class.
class library {
  // The constructor method for the library class.
  constructor() {}

  // Method to perform an asynchronous GET request to the specified URL.
  async get(url) {
    try {
      // Await the fetch request to the provided URL and store the response.
      const response = await fetch(url);
      // If the response status is not OK, throw an error.
      if (!response.ok) {
        throw new Error(`GET Error: ${response.status}`);
      }
      // Await the parsing of the response body as JSON and store the data.
      const data = await response.json();
      // Call ShowResponse with the parsed data to display it.
      return ShowResponse(data);
    }
    catch (error) {
      // If an error is caught, return the error message.
      return error.message;
    }
  }

  // Method to perform an asynchronous POST request to the specified URL with the provided data.
  async post(url, data) {
    try {
      // Await the fetch request with the provided URL, setting method to POST and including headers and body.
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        // Convert the data object to a JSON string before sending.
        body: JSON.stringify(data) 
      });
      // If the response status is not OK, throw an error.
      if (!response.ok) {
        throw new Error(`POST Error: ${response.status}`);
      }
      // Await the parsing of the response body as JSON and store the response data.
      const responseData = await response.json();
      // Call ShowResponse with the parsed response data to display it.
      return ShowResponse(responseData);
    }
    catch (error) {
      // If an error is caught, return the error message.
      return error.message;
    }
  }

  // Method to perform an asynchronous PUT request to the specified URL with the provided data.
  async put(url, data) {
    try {
      // Await the fetch request with the provided URL, setting method to PUT and including headers and body.
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        // Convert the data object to a JSON string before sending.
        body: JSON.stringify(data)
      });
      // If the response status is not OK, throw an error.
      if (!response.ok) {
        throw new Error(`PUT Error: ${response.status}`);
      }
      // Await the parsing of the response body as JSON and store the response data.
      const responseData = await response.json();
      // Await the parsing of the response body as JSON and store the response data.
      return ShowResponse(responseData); 
    }
    catch (error) {
      // If an error is caught, return the error message.
      return error.message;
    }
  }

  // Method to perform an asynchronous PATCH request to the specified URL with the provided data.
  async patch(url, data) {
    try {
      // Await the fetch request with the provided URL, setting method to PATCH and including headers and body.
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        // Convert the data object to a JSON string before sending.
        body: JSON.stringify(data)
      });
      // If the response status is not OK, throw an error.
      if (!response.ok) {
        throw new Error(`PATCH Error: ${response.status}`);
      }
      // Await the parsing of the response body as JSON and store the response data.
      const responseData = await response.json();
      // Await the parsing of the response body as JSON and store the response data.
      return ShowResponse(responseData);
    } 
    catch (error) {
      // If an error is caught, return the error message.
      return error.message;
    }
  }

  // Method to perform an asynchronous DELETE request to the specified URL.
  async delete(url) {
    try {
      // Await the fetch request with the provided URL, setting method to DELETE.
      const response = await fetch(url, {
        method: "DELETE"
      });
      // If the response status is not OK, throw an error.
      if (!response.ok) {
        throw new Error(`DELETE Error: ${response.status}`);
      }
      // Call ShowResponse with a message indicating that the user has been deleted.
      return ShowResponse("User Deleted");
    }
    catch (error) {
      // If an error is caught, return the error message.
      return error.message;
    }
  }
}
