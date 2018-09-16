
//GET Posts
// easyHTTP.get('https://jsonplaceholder.typicode.com/posts', function (error, posts) { 
//    if(error) {
//        console.log(error);
//    } else {
//        console.log(posts);
//    }
//  });

// GET Single Post

easyHTTP.get('https://jsonplaceholder.typicode.com/posts/1', function (error, post) { 
   if(error) {
       console.log(error);
   } else {
       console.log(post);
   }
 });


// POST Request 
//Create Data

// const data = {
//     title: 'Custom Post',
//     body: 'This is a custom Post'
// };

// // Create Post
// easyHTTP.post('https://jsonplaceholder.typicode.com/posts', data, function (error, posts) { 
//    if(error) {
//        console.log(error);
//    } else {
//        console.log(posts);
//    }
//  });


// PUT Request

// Create data to update post
// const data = {
//     title: 'Custom Post for update',
//     body: 'This is a custom update Post'
// };

// // Create Post
// easyHTTP.put('https://jsonplaceholder.typicode.com/posts/1', data, function (error, posts) { 
//    if(error) {
//        console.log(error);
//    } else {
//        console.log(posts);
//    }
//  });

//DELETE Posts
// easyHTTP.delete('https://jsonplaceholder.typicode.com/posts/1', function (error, response) { 
//    if(error) {
//        console.log(error);
//    } else {
//        console.log(response);
//    }
//  });
