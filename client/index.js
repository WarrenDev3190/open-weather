import R from 'ramda';
import * as $ from 'jquery';
import openWeatherService from './services/open-weather';
import { pipe } from './utils';


// The most basic way would be something like this.
$.ajax({
  method: 'GET',
  url: `http://api.openweathermap.org/data/2.5/weather?q=Nashville,us&appid=${API_KEY}`,
  success({ weather }) {
    console.log(weather[0]);
  },
});

// A more maintable and idiomatic way would be to extract the
// Open Weather interaction into it's own service.
// The way we've designed it works akin to a contructor, and in reality it's
// just another function that returns an object with our `getWeather` function
const ows = openWeatherService({ baseUrl: BASE_URL, apiKey: API_KEY }); // #1

ows.getWeather('Nashville,us') // #2
.then(({ weather }) => { // #3
  console.log(weather[0]); // #4
});

/**
 * 1. We initialize our Open Weather API Service by passing the URL and the API KEY.
 * 2. Now we can call the `getWeather` function, here we pass in the paramerters needed by the
 *    Open Weather API
 * 3. `JQuery.get` returns a Promise, Promise's handle asynchronous behaviours for us
 *    and allow us to handle the response to our AJAX request. Read up on Promises here:
 *     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * 4. Here we have access to the data(response from the Open Weather API) and we can get the
 *    weather.
 */

// The aspect of our API Service returning a `Promise` is really
// just an implementation detail. We can abstract that away by
// using a function in the utils module of this app called `pipe`
// Here's how I might attack it, in a more functional way.
const getWeather = pipe(ows.getWeather,
                        R.prop('weather'),
                        R.head,
                        R.tap(console.log.bind(console)));

getWeather('Nashville,us');
