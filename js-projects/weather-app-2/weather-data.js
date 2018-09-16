function Weather(cityName, description, temp) {
   this.cityName = cityName;
   this.description = description;
   this.temperature = temp + ' C';
}

// Object.defineProperty(Weather.prototype, 'temperature', {
//    get: function() {
//       return this._temperature;
//    },
//    set: function(value) {
//       this._temperature = value.toFixed(2) + 'C';
//    }
// })

