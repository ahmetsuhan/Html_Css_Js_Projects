const Book = function (title, isbn, author) {
  this.title = title;
  this.isbn = isbn;
  this.author = author;
};

function UI() {}
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");

  if (Array.from(document.querySelectorAll(".alert")).length < 3) {
    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
};

UI.prototype.deleteBook = function (target) {
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.checkISBN = function (isbn) {
  const reg = /\d/gi;

  return isbn.split("").length === 13 && reg.test(isbn);
};

document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, isbn, author);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    if (!ui.checkISBN(isbn)) {
      ui.showAlert("ISBN must be 13 digits or not valid!", "error");
    } else {
      ui.addBookToList(book);

      ui.showAlert("Book Added!", "success");

      ui.clearFields();
    }
  }
});

document.getElementById("book-list").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.className === "delete") {
    const ui = new UI();

    ui.deleteBook(e.target);

    ui.showAlert("Book Removed!", "success");
  }
});
