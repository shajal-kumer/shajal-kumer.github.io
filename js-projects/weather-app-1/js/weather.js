
class Weather {
    constructor(city, state) {
        this.apiKey = '99dfe35fcb7de1ee';
        this.city = city;
        this.state = state;
    }
    // Get Weather Location
   async getWeather () {
        const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`);

        const responseData = await response.json();

        return responseData.current_observation;
    }
    // Change Weather Location
    changeLocation(city, state) {
        this.city = city;
        this.state = state;
    }
} 