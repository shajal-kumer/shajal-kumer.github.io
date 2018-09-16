// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function Ui() { }

Ui.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert Cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);

};

Ui.prototype.clearFields = function () {
    const inputs = document.querySelectorAll('#title' + ',' + '#author' + ',' + '#isbn');
    inputs.forEach(function (element) {
        element.value = '';
    })
}
Ui.prototype.showAlert = function (message, className) {
    // Create Element 
    const div = document.createElement('div');
    // Add Class Name
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.getElementsByClassName('container')[0];
    // get form
    const form = document.getElementById('book-form');
    // Insert Alert
    container.insertBefore(div, form);

    // Time out after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);

}

Ui.prototype.deleteBook = function (target) {
    if (target.className == 'delete') {
        target.parentNode.parentNode.remove();
    }

};


// Local Storeage constructor
function Store() { }

Store.prototype.getBook = function () {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
};

Store.prototype.addBook = function (book) {
    const books = this.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
};

Store.prototype.displayBook = function () {
    const books = store.getBook();
    const ui = new Ui();
    books.forEach(el => {
        ui.addBookToList(el);
    });
};

Store.prototype.removeBook = function (isbn) {
    const books = store.getBook();

    books.forEach((el, index) => {
        if (el.isbn === isbn) {
            books.splice(index, 1);
        }

    });

    localStorage.setItem('books', JSON.stringify(books));

};


const store = new Store();
document.addEventListener('DOMContentLoaded', store.displayBook);

// Event Listener
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new Ui();

    // Validation
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill all the fields', 'error');
    } else {

        // Add book to the list
        ui.addBookToList(book);

        // Add book to the local storeage

        // Instantiate Store
        const store = new Store();
        store.addBook(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear Fields
        ui.clearFields();

    }

    e.preventDefault();
});

// Event Listener for delete book 
document.getElementById('book-list').addEventListener('click', function (e) {

    ui = new Ui();
    // Delete book;
    ui.deleteBook(e.target);

    // Remove form local storeage
    const store = new Store();
    store.removeBook(e.target.parentNode.previousElementSibling.textContent);

    // Show Messaage
    ui.showAlert('Delete Success', 'success');
});