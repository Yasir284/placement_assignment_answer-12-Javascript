import fetch from "node-fetch";

async function fetchData() {
  try {
    let respnse = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await respnse.json();

    localStorage.setItem("Blogs", JSON.stringify(data));

    console.log(data);
  } catch (err) {
    console.log("ERROR:", err.message || err);
  }
}

fetchData();
