//reads
async function getDataWithFetch() {
    try {
      const resource = "https://jsonplaceholder.typicode.com/posts/1";
      const options = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"},
      };
     
      const response = await fetch(resource, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      updatePage("Fetch", data);
    } 

    catch (error) {
      console.error("Fetch failed:", error);
    }
}
//creates
async function postDataWithFetch() {
}
//updates
async function putDataWithFetch() {
}
//deletes
async function deleteDataWithFetch() {
    try {
        const resource = "https://jsonplaceholder.typicode.com/posts/1";
        const options = {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(resource, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        updatePage("DELETE", data);
    } catch (error) {
        console.error("Fetch failed:", error);
    }
}



function updatePage(requestType, data) {
    document.querySelector("#output").innerHTML = `
    <h2>Retrieved Data with ${requestType}</h2>
    <p>User ID: ${data.userId}</p>
    <p>ID: ${data.id}</p>
    <p>Title: ${data.title}</p>
    <p>Body: ${data.body}</p>
  `;
  }

  document.querySelector("#getFetch").addEventListener("click", getDataWithFetch);
  document.querySelector("#postFetch").addEventListener("click", postDataWithFetch);
  document.querySelector("#putFetch").addEventListener("click", putDataWithFetch);
  document.querySelector("#deleteFetch").addEventListener("click", deleteDataWithFetch);


