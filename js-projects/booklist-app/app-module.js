//BOOK LIST CONTROLLER
const bookListController = (function () {
    class Book {
        constructor(title, author, isbn) {
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }
    }
    return {
        addItem: function (title, author, isbn) {
            const book = new Book(title, author, isbn);
            return book;
        }
    }
})();

// UI CONTROLER
const UIController = (function () {
    const DOMStrings = {
        container: '.container',
        inputForm: '#book-form',
        inputTitle: '#title',
        inputAuthor: '#author',
        inputIsbn: '#isbn',
        bookList: '#book-list'
    };

    return {
        getDomstrings: function () {
            return DOMStrings;
        },
        getInput: function () {
            return {
                title: document.querySelector(DOMStrings.inputTitle).value,
                author: document.querySelector(DOMStrings.inputAuthor).value,
                isbn: document.querySelector(DOMStrings.inputIsbn).value,
            }
        },
        addListItem: function (obj) {
            let html;
            html = `<tr>
                            <th>${obj.title}</th>
                            <th>${obj.author}</th>
                            <th>${obj.isbn}</th>
                            <th><a href="#" class="delete">X</a></th>
                        </tr>`;
            const list = document.getElementById('book-list');
            list.insertAdjacentHTML('beforeend', html);
        },
        showAlert: function (message, className) {
            let errorWrap;
                // get error-wrap;
                errorWrap = document.querySelector('.error-wrap');
                errorWrap.innerHTML = `<div class="alert ${className}">${message}</div>`;
                setTimeout(function(){
                    document.querySelector('.alert').remove();
                },3000);
             
        },
        clearFields: function () {
            const inputs = document.querySelectorAll(`${DOMStrings.inputAuthor} , 
                                                    ${DOMStrings.inputTitle} , ${DOMStrings.inputIsbn}`);
            inputs.forEach(function (element) {
                element.value = '';
            });
        },

        deleteItem: function (target) {
            if (target.className == 'delete') {
                target.parentNode.parentNode.remove();
            }
            this.showAlert('Delete Success!', 'success');
        }
    };
})();

// APP CONTROLLER
const appController = (function (bookCtrl, UICtrl) {
    const DOMStrings = UICtrl.getDomstrings();
    // // All Event Listener
    const setupEventListener = function () {
        
        document.querySelector(DOMStrings.inputForm).addEventListener('submit', ctrlAddItem);
        document.getElementById('book-list').addEventListener('click', deleteItem)
    }

    const ctrlAddItem = function (e) {
        // Get Input value
        const input = UICtrl.getInput();

        // Validation
        if (input.title === '' || input.author === '' || input.isbn === '') {
            UICtrl.showAlert('Please fill all the fields', 'error');
        } else {
            // Instantiate book
            const newItem = bookCtrl.addItem(input.title, input.author, input.isbn);

            // Add List Item
            UICtrl.addListItem(newItem);

            // Show success
            UICtrl.showAlert('Book Added!', 'success');

            // Clear Fields
            UICtrl.clearFields();
        }

        e.preventDefault();
    };

    const deleteItem = function (e) {
        UICtrl.deleteItem(e.target);
    };
    const addErrorWrap = function () {  
        let html;
             html = `<div class="error-wrap"><div>`;
             // get Form
             const form = document.querySelector(DOMStrings.inputForm);
             const container = document.querySelector('.container');
             form.insertAdjacentHTML('beforebegin', html);
    };

    return {
        init: function () {
            addErrorWrap();
            setupEventListener();
            console.log("Application started");
        }
    };

}(bookListController, UIController));

appController.init();