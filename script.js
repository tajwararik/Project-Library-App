const modalOpen = document.querySelector('button[type="button"]');
const dialog = document.querySelector("dialog");
const modalClose = document.querySelector("span");

const form = document.querySelector("form");
const submitButton = form.querySelector('button[type="submit"]');

const titleInput = form.querySelector("#title");
const authorInput = form.querySelector("#author-name");
const numberOfPagesInput = form.querySelector("#page-numbers");
const radioButtonInput = form.querySelectorAll("input[type='radio']")[0];

// Opening the form
modalOpen.addEventListener("click", () => {
  dialog.showModal();
});

// Closing the form
modalClose.addEventListener("click", () => {
  form.reset();
  dialog.close();
});

// Array for hosting the book cards
const myLibrary = [];

// Book object template
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  toggleStatus() {
    // Changing the reading status
    this.status = this.status === "Read" ? "Not read yet" : "Read";
  }
}

// Removing previous custom validity
titleInput.addEventListener("input", function () {
  this.setCustomValidity("");
});

// Removing previous custom validity
authorInput.addEventListener("input", function () {
  this.setCustomValidity("");
});

// Removing previous custom validity
numberOfPagesInput.addEventListener("input", function () {
  this.setCustomValidity("");
});

// Removing previous custom validity
radioButtonInput.addEventListener("input", function () {
  this.setCustomValidity("");
});

function addToLibrary() {
  const title = titleInput.value;
  const author = authorInput.value;
  const numberOfPages = numberOfPagesInput.value;
  let readingStatus = "";

  const radioCheck = form.querySelectorAll('input[type="radio"]');

  // Getting the checked radio button
  radioCheck.forEach((radio) => {
    if (radio.checked) readingStatus = radio.value;
  });

  // Setting custom validation for title input
  if (!titleInput.checkValidity()) {
    titleInput.setCustomValidity("Please enter the book title!");
    titleInput.reportValidity();
    return;
  } else {
    titleInput.setCustomValidity("");
  }

  // Setting custom validation for author input
  if (!authorInput.checkValidity()) {
    authorInput.setCustomValidity("Please enter the author name!");
    authorInput.reportValidity();
    return;
  } else {
    authorInput.setCustomValidity("");
  }

  // Setting custom validation for page number input
  if (!numberOfPagesInput.checkValidity() || numberOfPages <= 0) {
    numberOfPagesInput.setCustomValidity("Please enter correct page numbers!");
    numberOfPagesInput.reportValidity();
    return;
  } else {
    numberOfPagesInput.setCustomValidity("");
  }

  // Setting custom validation for radio input
  if (readingStatus === "") {
    radioButtonInput.setCustomValidity("Please select one of these options!");
    radioButtonInput.reportValidity();
    return;
  } else {
    radioButtonInput.setCustomValidity("");
  }

  // Creating objects for books
  const newBook = new Book(title, author, numberOfPages, readingStatus);

  myLibrary.push(newBook);

  displayBooks();
  form.reset();
  dialog.close();
}

function displayBooks() {
  const bookContainer = document.querySelector(".collection > div");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    // Creating card for every book
    const card = document.createElement("div");
    card.classList.add("card");

    // Adding books to the card
    card.innerHTML = `<h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Pages:</strong> ${book.pages}</p>
    <p><strong>Status:</strong> ${book.status}</p>`;

    // Creating remove button for the book card
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("data-index", index);
    removeButton.textContent = "Remove";

    // Creating toggle button for the book card
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-button");
    toggleButton.setAttribute("data-index", index);
    // Selecting the content of toggle button
    toggleButton.textContent =
      book.status === "Read" ? "Mark not read" : "Mark read";

    card.appendChild(toggleButton);
    card.appendChild(removeButton);
    bookContainer.appendChild(card);
  });

  const getAllRemoveButtons = document.querySelectorAll(".remove-button");
  getAllRemoveButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Getting the index of the remove button
      const index = e.target.getAttribute("data-index");
      // Calling function to remove the book
      removeBook(index);
    });
  });

  const getAllToggleButtons = document.querySelectorAll(".toggle-button");
  getAllToggleButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Getting the index of the toggle button
      const index = e.target.getAttribute("data-index");
      // Calling function to change the reading status
      changeStatus(index);
    });
  });
}

function removeBook(index) {
  // Removing the element
  myLibrary.splice(index, 1);
  // Reloading the display
  displayBooks();
}

function changeStatus(index) {
  // Changing the reading status
  myLibrary[index].toggleStatus();
  // Reloading the display
  displayBooks();
}

form.addEventListener("submit", (e) => {
  // Preventing default submission
  e.preventDefault();
  addToLibrary();
});
