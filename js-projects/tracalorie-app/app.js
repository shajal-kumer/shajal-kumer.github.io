// Storage Controller
const StorageCtrl = (function () {

    // Public item
    return {
        storeItem: function (item) {
            let items;
            if (localStorage.getItem('items') === null) {
                items = [];
                // Push new Item
                items.push(item);
                // Set Ls
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // Get what is already in ls
                items = JSON.parse(localStorage.getItem('items'));
                // Push new item
                items.push(item);
                // Reset Ls
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getitemsFromStorage: function () {
            let items;
            if (localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateStorageItem: function (updatedItem) {
            const items = JSON.parse(localStorage.getItem('items'));

            items.forEach((item, index) => {
                if (item.id === updatedItem.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteFromStorage: function (id) {
            const items = JSON.parse(localStorage.getItem('items'));

            items.forEach((item, index) => {
                if (item.id === id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearitemsFromStorage: function () {
            localStorage.removeItem('items');
            // localStorage.clear();
        }
    };
})();

// Item Controller
const ItemCtrl = (function () {
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Data Structure / State
    const data = {
        // items : [
        // {id: 0, name: 'Steak Dinner', calories: 1000},
        // {id: 1, name: 'Cookies', calories: 400},
        // {id: 2, name: 'Eggs', calories: 400},
        // ],
        items: StorageCtrl.getitemsFromStorage(),
        currentitem: null,
        totalCalories: 0
    };

    // Public Method
    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;

            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number 
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // Add To litem Array
            data.items.push(newItem);

            // Return newItem to display DOM
            return newItem;
        },
        updateItem: function (name, calories) {
            // Covert calories to number
            calories = parseInt(calories);

            let found;
            data.items.forEach(item => {
                if (item.id === data.currentitem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function (id) {
            const ids = data.items.map(item => {
                return item.id;
            });
            // get index
            const index = ids.indexOf(id);

            // Delete item from data
            data.items.splice(index, 1);
        },
        clearAllItems: function () {
            data.items = [];
        },
        getItemById: function (id) {
            let found = null;
            data.items.forEach(item => {
                if (item.id === id) {
                    found = item;
                }
            });

            return found;
        },
        setCurrentItem: function (current) {
            data.currentitem = current;
            // console.log(current);
        },
        getCurrentItem: function () {
            return data.currentitem;
        },
        getTotalCalories: function () {
            let total = 0;

            data.items.forEach(function (item) {
                total += item.calories;
            });

            // Set total calories to data
            data.totalCalories = total;

            // Return Total calories
            return total;
        },
        logData: function () {
            return data;
        }
    };
})();


// UI Controller 

const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        editItem: '.edit-item',
        clearBtn: '.clear-btn'
    };

    // Public Method
    return {
        populateItemList: function (items) {
            let html = '';

            items.forEach(item => {
                html += `
                <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>
                `;
            });

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            };
        },

        addListItem: function (item) {
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li elemet
            const li = document.createElement('li');
            // Add Class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // add HTML
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            `;
            // Insert item 
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        updateListItem: function (item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Check item to UI
            listItems.forEach(listitem => {
                if (listitem.id === `item-${item.id}`) {
                    listitem.innerHTML = `
                   <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                   <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                   `
                }

            });
        },
        deleteListItem: function (id) {
            const listId = `#item-${id}`;
            const item = document.querySelector(listId);
            item.remove();
        },
        removeItems: function () {
            document.querySelector(UISelectors.itemList).innerHTML = '';
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        addItemToForm: function () {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            this.showEditState();
        },

        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        clearEditState: function (e) {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        getSelectors: function () {
            return UISelectors;
        }
    };
})();

// App Controller 

const App = (function (ItemCtrl, StorageCtrl, UICtrl) {

    const UISelector = UICtrl.getSelectors();
    // Load all event listener
    const loadEventListener = function () {
        // Add item event
        document.querySelector(UISelector.addBtn).addEventListener(
            'click', itemAddSubmit);
        // Stop Enter key press
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 12) {
                e.preventDefault();
                return false;
            }
        });
        // Edit item icon  event
        document.querySelector(UISelector.itemList).addEventListener(
            'click', itemEditClick);
        // Update item event
        document.querySelector(UISelector.updateBtn).addEventListener('click', itemUpdateSubmit);
        // Delete item event
        document.querySelector(UISelector.deleteBtn).addEventListener('click', itemDeleteSubmit);
        // Back Btn event
        document.querySelector(UISelector.backBtn).addEventListener('click', (e) => {
            UICtrl.clearEditState();
            e.preventDefault();
        });

        document.querySelector(UISelector.clearBtn).addEventListener('click', clearAllitemsClick);
    };

    // Add item Submit
    const itemAddSubmit = function (e) {
        // Get Form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calories input
        if (input.name !== '' && input.calories !== '') {
            // Add Item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Store in local storage
            StorageCtrl.storeItem(newItem);

            // Clear Input
            UICtrl.clearInput();
        }


        e.preventDefault();
    };

    // item Edit Click event
    const itemEditClick = function (e) {

        if (e.target.classList.contains('edit-item')) {
            // Get list item id
            const listId = e.target.parentNode.parentNode.id;

            // Break into array
            const listArray = listId.split('-');

            // get the actual id
            const id = parseInt(listArray[1]);

            // Get item by id
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set Current Item
            ItemCtrl.setCurrentItem(itemToEdit);

            //Add item to form 
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    };

    const itemUpdateSubmit = function (e) {
        // Get input item
        const input = UICtrl.getItemInput();

        // Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // Update list item
        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Update item local storage
        StorageCtrl.updateStorageItem(updatedItem);

        // Clear Edit satate
        UICtrl.clearEditState();

        e.preventDefault();
    }

    const itemDeleteSubmit = function (e) {
        // get the current id
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data strucutre
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Delete item form Local storage
        StorageCtrl.deleteFromStorage(currentItem.id);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Clear Edit satate
        UICtrl.clearEditState();

        e.preventDefault();
    };

    const clearAllitemsClick = function () {
        // Clear item from data structure
        ItemCtrl.clearAllItems();

        // Remove item form UI
        UICtrl.removeItems();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Remove item From Ls
        StorageCtrl.clearitemsFromStorage();

        // hide listItems
        UICtrl.hideList();
    };
    // Public Method
    return {
        init: function () {
            // console.log('Program Intialize...');
            // Clear Edit satate and input
            UICtrl.clearEditState();

            // Fetch item from data structure
            const items = ItemCtrl.getItems();

            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                //  Populate List With Items
                UICtrl.populateItemList(items);
            }
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Load all event listener
            loadEventListener();
        }
    };
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();