class library {
  constructor() {}

  async get(url) {
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`GET Error: ${response.status}`);
      }
      const data = await response.json();
      return ShowResponse(data);
    }
    catch (error) {
      return error.message;
    }
  }

  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`POST Error: ${response.status}`);
      }
      const responseData = await response.json();
      return ShowResponse(responseData);
    }
    catch (error) {
      return error.message;
    }
  }

  async put(url, data) {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`PUT Error: ${response.status}`);
      }
      const responseData = await response.json();
      return ShowResponse(responseData); 
    }
    catch (error) {
      return error.message;
    }
  }

  async patch(url, data) {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`PATCH Error: ${response.status}`);
      }
      const responseData = await response.json();
      return ShowResponse(responseData);
    } 
    catch (error) {
      return error.message;
    }
  }

  async delete(url) {
    try {
      const response = await fetch(url, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error(`DELETE Error: ${response.status}`);
      }
      
      return ShowResponse("User Deleted");
    }
    catch (error) {
      return error.message;
    }
  }
}
