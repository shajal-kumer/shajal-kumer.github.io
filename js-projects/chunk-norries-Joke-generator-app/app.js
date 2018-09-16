
document.querySelector('.get-jokes').addEventListener('click', loadJokes);

function loadJokes(e) {
    // get the category
    const category = document.getElementById('category').value;
    // Create an XHR object
    xhr = new XMLHttpRequest();
    // OPEN
    xhr.open('GET', `https://api.chucknorris.io/jokes/random?category=${category}`, true);

    // On load
    xhr.onload = function () {
        if (this.status === 200) {
            let html;
            let joke = JSON.parse(this.responseText);
            if (joke.category === null) {
                document.getElementById('output').innerHTML = '<h5>Something Went Wrong</h5>'
            } else {
                html = `<h5>${joke.value}</h5>`;
                document.getElementById('output').innerHTML = html;
            }

        }
    };

    xhr.send();

    e.preventDefault();
}