// import "@babel/polyfill";
import { http } from './http';
import { ui } from './ui';

// GET posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete 
document.querySelector('#posts').addEventListener('click', deletePost);

// listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancle
document.querySelector('.card-form').addEventListener('click', cancleEdit);

// Get Post
function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(error => console.log(error));
}

// Submit Post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

     const data = {
         title,
         body
     };     
    if(title === '' || body === '') {
        ui.showAlert('Please fill in all fields', 'alert alert-danger');        
    } else {
        if (id === '') {
            // create post
            http.post('http://localhost:3000/posts', data)
                .then(data => {
                    ui.showAlert('Post Added', 'alert alert-success');
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err));
        } else {
            // update post
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Post Updated', 'alert alert-success');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }
}

// delete Post
function deletePost(e) {
    if(e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post removed', 'alert alert-success');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }
   e.preventDefault();
}


// Enable Edit state
function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        };        
        // Fill form with current post
        ui.fillForm(data);
    }
    e.preventDefault();
}


// cancleEdit
function cancleEdit(e) {
    if(e.target.classList.contains('post-cancle')) {
        ui.changeFormState('add');
    }
    e.preventDefault();
}