function resetPage() {
  location.reload();
}

let apiKey = "063f2d8d4205c00d9e83991e6beade04";

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thur", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `       <div class="col-2">
              <div class="forecast-date">${day}</div>
              <img
                src="images/sun-cloud.png"
                alt=""
                class="forecast-image"
                id="forecast-image"
              />
              <div class="forecast-temperature">
                <span
                  class="forecast-temperature-max"
                  id="forecast-temperature-max"
                  ><strong>72°</strong></span
                >
                /
                <span
                  class="forecast-temperature-min"
                  id="forecast-temperature-min"
                  >54°</span
                >
              </div>
            </div>
          `;
    forecaseHTML = forecastHTML + `</div>`;
  });

  forecast.innerHTML = forecastHTML;
}

//display weather for current city.... rename for "my weather"
function showMyWeather(response) {
  myFahrenheit = Math.round(response.data.main.temp);
  displayForecast();

  let myCity = response.data.name;
  let city = document.querySelector("#current-city");
  city.innerHTML = `${myCity}`;

  let myTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${myTemp}`;

  let myWeatherDescription = response.data.weather[0].description;
  let weather = document.querySelector("#current-weather");
  weather.innerHTML = `${myWeatherDescription}`;

  let myWind = response.data.wind.speed;
  let wind = document.querySelector("#current-wind");
  wind.innerHTML = `Wind: ${myWind}mph`;

  let myHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `Humidity: ${myHumidity}%`;

  let myTempMax = Math.round(response.data.main.temp_max);
  let myMax = document.querySelector("#current-max");
  myMax.innerHTML = `Max: ${myTempMax}°`;

  let myTempMin = Math.round(response.data.main.temp_min);
  let myMin = document.querySelector("#current-min");
  myMin.innerHTML = `Min: ${myTempMin}°`;

  let myFeelsLike = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#current-feels-like");
  feelsLike.innerHTML = `Feels Like: ${myFeelsLike}°`;

  let myWeatherMain = response.data.weather[0].main;
  let newImage = document.querySelector("#img-current-temp");
  if (`${myWeatherMain}` === "Clear") {
    newImage.src = "images/sunny.png";
  }
  if (`${myWeatherMain}` === "Clouds") {
    newImage.src = "images/cloud.png";
  }
  if (`${myWeatherMain}` === "Rain") {
    newImage.src = "images/sub-cloud-rain.png";
  }
  if (`${myWeatherMain}` === "Snow") {
    newImage.src = "images/snow.png";
  }
  if (`${myWeatherMain}` === "Thunderstorm") {
    newImage.src = "images/lightning-storm.png";
  }
  if (`${myWeatherMain}` === "Drizzle") {
    newImage.src = "images/sub-cloud-rain.png";
  }

  let myEpochTime = response.data.dt;
  let myTime = new Date(myEpochTime * 1000);
  let myHours = new Date(myTime).getHours();
  let body = document.querySelector("body");
  let footerColor = document.querySelector("footer");
  let gradient;

  if (`${myHours}` >= 21 && `${myHours}` <= 4) {
    gradient = "linear-gradient(to top, #09203f 0%, #537895 100%)";
    footerColor.classList.add("footer-dark"); //evening
  } else if (`${myHours}` >= 5 && `${myHours}` <= 7) {
    gradient =
      "linear-gradient(75.2deg, rgb(41, 196, 255) -2.5%, rgb(255, 158, 211) 55%, rgb(255, 182, 138) 102.3%)"; //sunrise
  } else if (`${myHours}` >= 17 && `${myHours}` <= 20) {
    gradient =
      "linear-gradient(75.2deg, rgb(255, 182, 138) 2.5%, rgb(255, 158, 211) 44.8%, rgb(41, 196, 255) 102.3%)"; //sunset
  } else if (`${myWeatherMain}` !== "Clear") {
    gradient = "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)"; //daytime cloud/rain
  } else {
    gradient =
      "linear-gradient(109.6deg, rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%)"; //daytime clear
  }

  body.style.background = gradient;
}

function showPosition(position) {
  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;

  let apiUrlMyWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&units=imperial&appid=${apiKey}`;
  console.log(apiUrlMyWeather);
  axios.get(apiUrlMyWeather).then(showMyWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

myFahrenheit = null;

//get current location weather on load
navigator.geolocation.getCurrentPosition(showPosition);

//convert to celcius
function showMyCelsius(event) {
  event.preventDefault();
  let myTemp = Math.round((myFahrenheit - 32) / 1.8);

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${myTemp}`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  // let apiSearchURLForecast = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=hourly,daily&units=imperial&appid=${apiKey}`;
}

//display weather for searched city .... rename for "searched weather"
function showTemperature(response) {
  let showTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${showTemp}`;

  let weatherDescription = response.data.weather[0].description;
  let weather = document.querySelector("#current-weather");
  weather.innerHTML = `${weatherDescription}`;

  displayForecast();

  showFahrenheit = Math.round(response.data.main.temp);

  let showWind = response.data.wind.speed;
  let wind = document.querySelector("#current-wind");
  wind.innerHTML = `Wind: ${showWind}mph`;

  let showHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `Humidity: ${showHumidity}%`;

  let showFeelsLike = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#current-feels-like");
  feelsLike.innerHTML = `Feels Like: ${showFeelsLike}°`;

  let showTempMax = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#current-max");
  tempMax.innerHTML = `Max: ${showTempMax}°`;

  let showTempMin = Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#current-min");
  tempMin.innerHTML = `Min: ${showTempMin}°`;

  let weatherMain = response.data.weather[0].main;
  let newImage = document.querySelector("#img-current-temp");
  if (`${weatherMain}` === "Clear") {
    newImage.src = "images/sunny.png";
  }
  if (`${weatherMain}` === "Clouds") {
    newImage.src = "images/cloud.png";
  }
  if (`${weatherMain}` === "Rain") {
    newImage.src = "images/sun-cloud-rain.png";
  }
  if (`${weatherMain}` === "Snow") {
    newImage.src = "images/snow.png";
  }
  if (`${weatherMain}` === "Thunderstorm") {
    newImage.src = "images/lightning-storm.png";
  }
  if (`${weatherMain}` === "Drizzle") {
    newImage.src = "images/sun-cloud-rain.png";
  }

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-new-city");

  if (searchInput.value) {
    let newCity = document.querySelector("#current-city");
    newCity.innerHTML = `${searchInput.value}`;

    let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&appid=${apiKey}`;
    console.log(apiUrlSearch);
    axios.get(apiUrlSearch).then(showTemperature);
  }
}

let showFahrenheit = null;

let searchCity = document.querySelector("#search-bar");
searchCity.addEventListener("submit", search);

//display F when F is selected
let displayTempF = document.querySelector("#degree-F");
displayTempF.addEventListener("click", search);

//display C when C is selected
function showCelsius(event) {
  event.preventDefault();
  let myTemp = Math.round((showFahrenheit - 32) / 1.8);

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${myTemp}`;
}

let displayTempC = document.querySelector("#degree-C");
displayTempC.addEventListener("click", showCelsius);

//Display current day of week and current time
let displayDate = document.querySelector("#current-datetime");

function formatDate(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = weekdays[date.getDay()];
  let time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${weekday} ${time}`;
}

displayDate.innerHTML = formatDate(new Date());
