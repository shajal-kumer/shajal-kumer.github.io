class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    addBookToList(book) {
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
    }

    clearFields() {
        const inputs = document.querySelectorAll('#title' + ',' + '#author' + ',' +'#isbn');
        inputs.forEach(function (element) { 
            element.value = '';
        })
    }

    showAlert(message, className) {
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

    deleteBook(target) {
        if(target.className == 'delete') {
            target.parentNode.parentNode.remove();
        }
    }
}


class Store {
    static getBook() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBook() {
        const books = Store.getBook();
        const book = new Book();

        books.forEach(boo => {
            book.addBookToList(boo);
        });
    }

    static addBook(book) {
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBook();
        console.log(books);
        books.forEach((el, index) => {
            if(el.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books))
    }
}

//DOM Load event 
document.addEventListener('DOMContentLoaded', store.displayBook);


// Event Listener
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    // Instantiate book
    const book = new Book(title, author, isbn);

    // Validation
    if(title === '' || author === '' || isbn === '') {
        book.showAlert('Please fill all the fields', 'error');
    } else {

    // Add book to the list
    book.addBookToList(book);
    
    // Add book to local Storeage
    Store.addBook(book);
    
    // Show success
    book.showAlert('Book Added!', 'success');

    // Clear Fields
    book.clearFields();

    }

    e.preventDefault();
  });

  // Event Listener for delete book 
  document.getElementById('book-list').addEventListener('click', function (e) { 
    const book = new Book();
    book.deleteBook(e.target);

    // Remove book from Local storeage
    Store.removeBook(e.target.parentNode.previousElementSibling.textContent); 

    // Show Messaage
    book.showAlert('Delete Success', 'success');
  });