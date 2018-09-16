
// UI Controler 
const UIcontroler = (function() {
    const DOMStrings = {  
        form: '#task-form',
        taskInput: '#task',
        filter: '#filter',
        collection: '.collection',
        clearTask: '.clear-task'
    };
    return {
        getDOMStrings: () => {
            return DOMStrings;
        },
        addTask: inputvalue =>{ 
            // create element
            let li = document.createElement('li');

            // add class name
            li.className = 'collection-item';
            // Add text 
            li.appendChild(document.createTextNode(inputvalue));

            // Craete link button
            const link = document.createElement('a');
            
            // Add class name
            link.className = 'delete-item secondary-content';

            // Add font awesome cross icon
            link.innerHTML = '<i class="fa fa-remove"></i>';

            // Append link to li
            li.appendChild(link);

            // Select collection list
            const collection = document.querySelector(DOMStrings.collection);

            collection.appendChild(li);
         },
        clearInput: () => {
            document.querySelector(DOMStrings.taskInput).value = '';
        },
        deleteitem: (e) => {  
                if(e.target.className === 'fa fa-remove') {
                    if(confirm('Are u sure?')) 
                        e.target.parentNode.parentNode.remove();
                }
        },
        clearTask: () => {
               const collection = document.querySelector(DOMStrings.collection);
                // collection.innerHTML = '';
               // OR
               if(collection.children.length !== 0) {
                    if(confirm('Are u sure?'))
                    while(collection.firstChild) {
                        collection.removeChild(collection.firstChild);
                    }
               }
               
               // Clear From ls
               localStorage.clear();
        },
        // get task From LS
        getTask: () => {
            let tasks;
            if(localStorage.getItem('tasks') === null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }
        
            return tasks;
        },

        displayTask: () => {
            const collection = document.querySelector(DOMStrings.collection);
            const tasks = this.getTask();
            let self = this;
            tasks.forEach((el) => {
                self.addTask(el);
            });
        },
        additemToLS: inputvalue => {
            const tasks = this.getTask();
            tasks.push(inputvalue);
            localStorage.setItem('tasks', JSON.stringify(tasks));
         },
         removeTaskFromLs: e => { 
            const tasks = this.getTask();
            tasks.forEach((el, index) => {
                if(e.target.parentNode.parentNode.textContent === el) {
                 tasks.splice(index, 1);
                }
                
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
          }
    };
})();

// APP Controler
const controler = (function(UICtrl){

    let DOMCIN = UICtrl.getDOMStrings();

    // Setup all event listener 
    const allEventListener = () => { 
        document.querySelector(DOMCIN.form).addEventListener('submit', additem);
        document.querySelector(DOMCIN.collection).addEventListener('click', UICtrl.deleteitem);
        document.querySelector(DOMCIN.clearTask).addEventListener('click', UICtrl.clearTask);
        document.querySelector(DOMCIN.collection).addEventListener('click', removeTaskFromLs);
     };

     // Add item
     const additem = (e) => {
        let inputvalue;
        // get input value
        inputvalue = document.querySelector(DOMCIN.taskInput).value;

        //validation 
        if(inputvalue === '') {
            alert("Please Input value!");
        } else {
            
        // Add single task
        UICtrl.addTask(inputvalue);

        // Add to LS
        UICtrl.additemToLS(inputvalue);

        // Clear Input 
        UICtrl.clearInput();

        }
        e.preventDefault();
    };
    // Remove task list from Ls
    const removeTaskFromLs = e => {
        let target = e;
        UICtrl.removeTaskFromLs(target);
    };

return {
    init: () => { 
        allEventListener();
        UICtrl.displayTask();
        console.log("Programe Started");        
     }
}
})(UIcontroler);

controler.init();