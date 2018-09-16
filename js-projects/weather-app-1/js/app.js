// init storage 
const storage = new Storage();

// Get stored location data
const weatherLocation = storage.getLocation();

// init weather object
const weather = new Weather( weatherLocation.city,  weatherLocation.state);

// init UI Object
const ui = new UI;

// Change Weather Location event
document.querySelector('#w-change-btn').addEventListener('click', () => {
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    
    // Change location
    weather.changeLocation(city, state);

    // Set Location ls
    storage.setLocation(city, state);

    getWeather();

    $('#locModal').modal('hide');
})

// DOM Loaded load the getWeather
document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    weather.getWeather()
    .then(results => {
        ui.paint(results);
    })
    .catch(() => {
        ui.showError('Wrong input!');
    });
}
