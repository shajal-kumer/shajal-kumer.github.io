const SEARCH_BTN = document.querySelector('button');
const SEARCH_CITY = document.querySelector('#city');

const loadingText = document.querySelector('#load');
const weatherBox = document.querySelector('#weather');

let weatherCity = weatherBox.lastElementChild;
let weatherDescription = weatherBox.children[1];
let weatherTemperature = weatherBox.lastElementChild;

