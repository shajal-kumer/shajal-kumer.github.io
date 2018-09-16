
SEARCH_BTN.addEventListener('click', searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';

   let cityName = SEARCH_CITY.value.trim();
   if(cityName.length == 0) {
      alert('Please Eenter a city name.');
   }

   let http = new XMLHttpRequest();
   let apiKey = '270727840b68bd6f7fa99ba1e1cae4de';
   let url = 'http://api.openweathermap.org/data/2.5/weather?q='+ cityName + '&units=metric&appid='+apiKey;
   let method = 'GET';

   http.open(method, url);
   http.onreadystatechange = function() {
      if(http.readyState === 4 && http.status === 200) {
          let data = JSON.parse(http.responseText);
          let weatherData = new Weather(cityName, data.weather[0].description, data.main.temp);
        //   weatherData.temperature = data.main.temp;
          updateWeather(weatherData);
      } else if(http.readyState === 4 && http.status !== 200) {
         alert('Something went wrong!');
      }
   }
   http.send();
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}