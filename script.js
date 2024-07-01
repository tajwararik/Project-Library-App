const modalOpen = document.querySelector('button[type="button"]');
const dialog = document.querySelector("dialog");
const modalClose = document.querySelector("span");

const form = document.querySelector("form");
const submitButton = form.querySelector('button[type="submit"]');

modalOpen.addEventListener("click", () => {
  dialog.showModal();
});

modalClose.addEventListener("click", () => {
  dialog.close();
});

const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleStatus = function () {
  this.status = this.status === "Read" ? "Not read yet" : "Read";
};

function addToLibrary() {
  const title = form.querySelector("#title").value;
  const author = form.querySelector("#author-name").value;
  const numberOfPages = form.querySelector("#page-numbers").value;
  let readingStatus = "";

  const radioCheck = form.querySelectorAll('input[type="radio"]');

  radioCheck.forEach((radio) => {
    if (radio.checked) readingStatus = radio.value;
  });

  const newBook = new Book(title, author, numberOfPages, readingStatus);

  if (
    title !== "" &&
    author !== "" &&
    numberOfPages !== "" &&
    readingStatus !== ""
  ) {
    myLibrary.push(newBook);

    displayBooks();
  }

  form.reset();
}

function displayBooks() {
  const bookContainer = document.querySelector(".collection > div");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `<h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Pages:</strong> ${book.pages}</p>
    <p><strong>Status:</strong> ${book.status}</p>`;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("data-index", index);
    removeButton.textContent = "Remove";

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-button");
    toggleButton.setAttribute("data-index", index);
    toggleButton.textContent =
      book.status === "Read" ? "Mark not read" : "Mark read";

    card.appendChild(toggleButton);
    card.appendChild(removeButton);
    bookContainer.appendChild(card);
  });

  const getAllRemoveButtons = document.querySelectorAll(".remove-button");
  getAllRemoveButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      removeBook(index);
    });
  });

  const getAllToggleButtons = document.querySelectorAll(".toggle-button");
  getAllToggleButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      changeStatus(index);
    });
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function changeStatus(index) {
  myLibrary[index].toggleStatus();
  displayBooks();
}

submitButton.addEventListener("click", () => {
  addToLibrary();
});
