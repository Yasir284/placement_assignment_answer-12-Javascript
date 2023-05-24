// import fetch from "node-fetch";

const blogs = document.getElementById("blogs");
const inputName = document.getElementById("userName");
const inputTitle = document.getElementById("blogTitle");
const inputBody = document.getElementById("blogBody");
const form = document.querySelector("#create-blog-form");

form.addEventListener("submit", () => {
  createBlog(inputName.value, inputTitle.value, inputBody.value);

  inputName.value = "";
  inputTitle.value = "";
  inputBody.value = "";
});

async function fetchData() {
  try {
    if (!JSON.parse(localStorage.getItem("Blogs"))) {
      let respnse = await fetch("https://jsonplaceholder.typicode.com/posts");
      let data = await respnse.json();
      localStorage.setItem("Blogs", JSON.stringify(data));
    }

    displayBlogs(JSON.parse(localStorage.getItem("Blogs")));
  } catch (err) {
    console.log("ERROR:", err.message || err);
  }
}

fetchData();

function createElement(tag, content, ...classes) {
  let element = document.createElement(tag);
  if (tag == undefined) return null;

  if (classes.length !== 0) {
    element.classList.add(...classes);
  }

  if (content !== undefined) {
    element.textContent = content;
  }

  return element;
}

function deleteBlog(id, cardElement) {
  console.log("cardElement", cardElement);
  console.log("id", id);
  console.log("Button clicked");
  let blogs = JSON.parse(localStorage.getItem("Blogs")).filter(
    (e) => e.id !== id
  );

  localStorage.setItem("Blogs", JSON.stringify(blogs));
  cardElement.remove();
}

function createCard(title, user, body, id) {
  let cardElement = createElement("div", undefined, "card");
  let titleElement = createElement("h2", title, "title");
  let userElement = createElement("span", "By: " + user, "user");
  let blogBodyElement = createElement("p", body, "blog-body");
  let deleteButton = createElement("button", "Delete", "delete-btn");

  deleteButton.addEventListener("click", () => {
    deleteBlog(id, cardElement);
  });

  blogs.appendChild(cardElement);
  cardElement.append(titleElement, userElement, blogBodyElement, deleteButton);
}

function displayBlogs(blogs) {
  console.log("BLOGS:", blogs);
  if (Array.isArray(blogs)) {
    blogs.map((e) => {
      createCard(e.title, "User-" + e.userId, e.body, e.id);
    });
  } else {
    createCard(blogs.title, blogs.userId, blogs.body);
  }
}

function createBlog(userName, blogTitle, blogBody) {
  let blogs = JSON.parse(localStorage.getItem("Blogs"));
  console.log("Blogs:", blogs);

  let newBlog = {
    userId: userName,
    id: blogs?.length + 1,
    title: blogTitle,
    body: blogBody,
  };

  displayBlogs(newBlog);

  blogs?.unshift(newBlog);

  localStorage.setItem("Blogs", JSON.stringify(blogs));
}
