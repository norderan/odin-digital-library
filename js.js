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


class Book {
  static #library = [];
  constructor(name, author, genre, pages, isRead) {
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.isRead = isRead;
    this.bookId = crypto.randomUUID();
  }
  setRead() {
    this.isRead = !this.isRead;
  }

  addBookToDom() {
    if (!html.booksContainer) {
        console.error('Element with ID "books-container" not found.');
        return;
    }

    const card = document.createElement('div');
    card.className = 'book-card';
    card.id = this.bookId;
    const title = document.createElement('h1');
    title.className = 'book-name';
    title.textContent = this.name;

    const author = document.createElement('h2');
    author.className = 'book-author';
    author.textContent = this.author;

    const genre = document.createElement('h2');
    genre.className = 'book-genre';
    genre.textContent = this.genre;

    const pages = document.createElement('h3');
    pages.className = 'book-pages';
    pages.textContent = this.pages;

    const buttonContainer = document.createElement('div');

    const readButton = document.createElement('button');
    readButton.className = 'is-read-button';
    if(this.isRead){
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
    Book.#library.push(this);
  }

  static removeBookFromId(idToRemove){
    Book.#library = Book.#library.filter(book => book.bookId !== idToRemove);
  }

  static findBookFromId(bookIdTofind) {
  return Book.#library.find(book => book.bookId === bookIdTofind);
  }
}

const demoBooks = [
    new Book('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 180, true),
    new Book('1984', 'George Orwell', 'Dystopian', 328, false),
    new Book('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 281, true),
    new Book('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 277, false),
    new Book('Moby Dick', 'Herman Melville', 'Adventure', 635, false),
];

demoBooks.forEach(book => book.addBookToDom());

document.querySelector('#books-container').addEventListener('click', function (e) {
  if (e.target.matches('.remove')) {
    console.log("ASDASDADSas");
    const parentWithId = e.target.closest('[id]');
    if (parentWithId) {
      const idToRemove = parentWithId.id;
      parentWithId.remove();
      Book.removeBookFromId(idToRemove);
      console.log("[+] book " + idToRemove + " was removed.");
    }
  }
});


document.querySelector('#books-container').addEventListener('click', function (e) {
  if (e.target.matches('.is-read-button')) {
    const button = e.target;
    console.log("ASDASDADSas");

    if (button.classList.contains('button-is-read')) {
      button.classList.add("button-is-not-read");
      button.classList.remove("button-is-read");
      button.textContent = "not read";
    } else {
      button.classList.remove("button-is-not-read");
      button.classList.add("button-is-read");
      button.textContent = "read";
    }

    const bookIdToFind = button.closest('[id]');
    if (bookIdToFind) {
      const book = Book.findBookFromId(bookIdToFind.id);
      book.setRead();
    }
  }
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

  newBook.addBookToDom();
  console.log("[+] Pushed "+ newBook.author);
  html.form.reset();
  html.dialog.close();
});
