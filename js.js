const html = {
    header: document.getElementById('header'),
    booksContainer: document.getElementById('books-container'),
    form: document.querySelector('form'),
    dialog: document.querySelector("dialog"),
    buttonsInForm: document.getElementById('buttons-in-form'),
    addBooksButton: document.getElementById('add-books'),
    readButton: document.querySelectorAll('.is-read-button'),
    removeButton: document.querySelectorAll('.remove'),
    submitButton: document.querySelector('#buttons-in-form button[type="submit"]'),
    closeButton: document.getElementById('closeButton')
};

html.addBooksButton.addEventListener("click", () => {
    html.dialog.showModal();
});

html.closeButton.addEventListener("click", () => {
    html.dialog.close();
});

html.submitButton.addEventListener("click", () => {
    html.dialog.close();
});

const library = [];

function Book(name, author, genre, pages, isRead) {
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.isRead = isRead;
    this.bookId = crypto.randomUUID();
}




html.form.addEventListener('submit', function (event) {
  event.preventDefault(); // prevent actual form submission

  const formData = new FormData(html.form);
  const newBook = new Book(
    formData.get("name"),
    formData.get("author"),
    formData.get("genre"),
    parseInt(formData.get("pages")),         
    formData.get("isRead") === "on"          
  );

  library.push(newBook);
  console.log("[+] Pushed "+ newBook.author);
});


function addBookToLibrary() {
    // take params, create a book then store it in the array
}
  