const html = {
    header: document.getElementById('header'),
    booksContainer: document.getElementById('books-container'),
    form: document.querySelector('form'),
    dialog: document.querySelector("dialog"),
    buttonsInForm: document.getElementById('buttons-in-form'),
    addBooksButton: document.getElementById('add-books'),
    submitButtons: document.querySelector('#buttons-in-form button[type="submit"]'),
    closeButton: document.getElementById('closeButton'),
    themeToggle: document.getElementById('dark-theme-switch')
};

html.themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

html.addBooksButton.addEventListener("click", () => {
    html.dialog.showModal();
});

html.closeButton.addEventListener("click", () => {
    html.dialog.close();
});


let library = [];

const demoBooks = [
    new Book('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 180, true),
    new Book('1984', 'George Orwell', 'Dystopian', 328, false),
    new Book('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 281, true),
    new Book('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 277, false),
    new Book('Moby Dick', 'Herman Melville', 'Adventure', 635, false),
];

demoBooks.forEach(book => addBookToDom(book));

console.log(library);
function Book(name, author, genre, pages, isRead) {
    if(!new.target){
      throw Error("You must not call without new.");
    }
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.isRead = isRead;
    this.bookId = crypto.randomUUID();
}

Book.prototype.setRead = function() {
  this.isRead = !this.isRead;
}

document.querySelectorAll('.remove').forEach(button => {
  button.addEventListener('click', function () {
    const parentWithId = this.closest('[id]');
    if (parentWithId) {
      parentWithId.remove();
    }
    const idToRemove = parentWithId.id;
    library = library.filter(book => book.bookId !== idToRemove);
    console.log("[+] book " + parentWithId.id + " was removed.");
  });
});

document.querySelectorAll('.is-read-button').forEach(button => {
  button.addEventListener('click', function () {
    if(button.classList.contains('button-is-read')){
      button.classList.add("button-is-not-read")
      button.classList.remove("button-is-read")
      button.textContent = "not read"
    } else {
      button.classList.remove("button-is-not-read")
      button.classList.add("button-is-read")
      button.textContent = "read"
    }
    const parentWithId = this.closest('[id]');
    let book = library.find(book => book.bookId === parentWithId.id);
    book.setRead();
  });
});



//Gets book from user and pushes to library
html.form.addEventListener('submit', function (event) {
  event.preventDefault(); 

  const formData = new FormData(html.form);
  const newBook = new Book(
    formData.get("name"),
    formData.get("author"),
    formData.get("genre"),
    parseInt(formData.get("pages")),         
    formData.get("isRead") === "on"          
  );

  addBookToDom(newBook);
  console.log("[+] Pushed "+ newBook.author);
  html.form.reset();
  html.dialog.close();
});

//Adds book to dom
function addBookToDom(book) {
    if (!html.booksContainer) {
        console.error('Element with ID "books-container" not found.');
        return;
    }

    const card = document.createElement('div');
    card.className = 'book-card';
    card.id = book.bookId;
    const title = document.createElement('h1');
    title.className = 'book-name';
    title.textContent = book.name;

    const author = document.createElement('h2');
    author.className = 'book-author';
    author.textContent = book.author;

    const genre = document.createElement('h2');
    genre.className = 'book-genre';
    genre.textContent = book.genre;

    const pages = document.createElement('h3');
    pages.className = 'book-pages';
    pages.textContent = book.pages;

    const buttonContainer = document.createElement('div');

    const readButton = document.createElement('button');
    readButton.className = 'is-read-button';
    if(book.isRead){
      readButton.textContent = 'read';
      readButton.classList.add('button-is-read');
    } else {
      readButton.textContent = 'not read';
      readButton.classList.add('button-is-not-read');
    }

    const removeButton = document.createElement('button');
    removeButton.className = 'remove';
    removeButton.textContent = 'remove';

    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(removeButton);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(genre);
    card.appendChild(pages);
    card.appendChild(buttonContainer);
    html.booksContainer.prepend(card);
    library.push(book);
}
  