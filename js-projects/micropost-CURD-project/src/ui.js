class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }
    // Show post
    showPosts(posts) {
        let output = '';
        posts.forEach(post => {
            output += `
                <div class='card mb-3'>
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i> 
                        </a>
                    </div>
                </div>
            `;
        });
        this.post.innerHTML = output;
    }
    // Show alert message
    showAlert(message, className) {
        this.clearAlert();

        // create div
        const div = document.createElement('div');
        // add class
        div.className = className;
        // add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.posts-container');
        // Get posts
        const posts = document.querySelector('#posts');
        // Insert ALert div
        container.insertBefore(div, posts);

        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }
    // Clear alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if(currentAlert) {
            currentAlert.remove();
        }
    }
    // Clear input
    clearFields(){
        this.titleInput.value = ' ';
        this.bodyInput.value = ' ';
    }
    // clearIdInput 
    clearIdInput() {
        this.idInput.value = '';
    }
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;
            
        this.changeFormState('edit');
    }
     // Change form state
     changeFormState(type) {
         if (type === 'edit') {
             this.postSubmit.textContent = 'Update Post';
             this.postSubmit.classList.replace('btn-primary', 'btn-danger');

             // Create cancle btn
             const button = document.createElement('button');
             button.className = 'post-cancle btn btn-light btn-block';
             button.appendChild(document.createTextNode('Cancle'));
             //get parent
             const parent = document.querySelector('.card-body');
             // get element to insert before
             const formEnd = document.querySelector('.form-end');
             //insert element
             parent.insertBefore(button, formEnd);
            //  parent.insertAdjacentElement('beforeend', button);
         }else  {
             this.postSubmit.textContent = 'Post it';
             this.postSubmit.classList.replace('btn-danger', 'btn-primary');
            // REmove cancle btn if it is there
             if(document.querySelector('.post-cancle')) {
                 document.querySelector('.post-cancle').remove();
             }
             // Clear ID from hidden field
             this.clearIdInput();
             // Clear field text
             this.clearFields();
         }
         
     }
   
}


export const ui = new UI();