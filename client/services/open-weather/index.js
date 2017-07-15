import * as $ from 'jquery';

const openWeatherService = ({ baseUrl, apiKey }) => ({
  getWeather(city) {
    return $.get(`${baseUrl}weather?q=${city}&appid=${apiKey}`);
  },
});

module.exports = openWeatherService;
