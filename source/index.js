function resetPage() {
  location.reload();
}

let apiKey = "063f2d8d4205c00d9e83991e6beade04";

function displayForecast() {
  //let forecast = document.querySelector("#forecast");
  //forecast.innerHTML = "";
}

//display weather for current city.... rename for "my weather"
function showCurrentF(response) {
  let myTemp = Math.round(response.data.main.temp);
  let myCity = response.data.name;
  let myWeatherDescription = response.data.weather[0].description;
  let myWeatherMain = response.data.weather[0].main;
  let myHumidity = response.data.main.humidity;
  let myWind = response.data.wind.speed;

  myCurrentFahrenheit = Math.round(response.data.main.temp);

  displayForecast();

  let city = document.querySelector("#current-city");
  city.innerHTML = `${myCity}`;
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${myTemp}`;
  let weather = document.querySelector("#current-weather");
  weather.innerHTML = `${myWeatherDescription}`;
  let wind = document.querySelector("#current-wind");
  wind.innerHTML = `Wind: ${myWind}mph`;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `Humidity: ${myHumidity}%`;

  if (`${myWeatherMain}` === "Clear") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/sunny.png";
  }
  if (`${myWeatherMain}` === "Clouds") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/cloud.png";
  }
  if (`${myWeatherMain}` === "Rain") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/sub-cloud-rain.png";
  }
  if (`${myWeatherMain}` === "Snow") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/snow.png";
  }
  if (`${myWeatherMain}` === "Thunderstorm") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/lightning-storm.png";
  }
  if (`${myWeatherMain}` === "Drizzle") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/sub-cloud-rain.png";
  }
}

function showPosition(position) {
  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;

  let apiUrlCurrentF = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&units=imperial&appid=${apiKey}`;
  console.log(apiUrlCurrentF);
  axios.get(apiUrlCurrentF).then(showCurrentF);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

myCurrentFahrenheit = null;

//get current location weather on load
navigator.geolocation.getCurrentPosition(showPosition);

//convert to celcius
function showMyCelsius(event) {
  event.preventDefault();
  let myTemp = Math.round((myCurrentFahrenheit - 32) / 1.8);

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${myTemp}`;
}

//display weather for searched city .... rename for "searched weather"
function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let WeatherDescription = response.data.weather[0].description;
  let WeatherMain = response.data.weather[0].main;
  let temperatureElement = document.querySelector("#current-temp");
  let weather = document.querySelector("#current-weather");
  let Humidity = response.data.main.humidity;
  let Wind = response.data.wind.speed;

  displayForecast();
  showFahrenheit = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = `${temp}`;
  weather.innerHTML = `${WeatherDescription}`;

  let wind = document.querySelector("#current-wind");
  wind.innerHTML = `Wind: ${Wind}mph`;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `Humidity: ${Humidity}%`;

  if (`${WeatherMain}` === "Clear") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/sunny.png";
  }
  if (`${WeatherMain}` === "Clouds") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/cloud.png";
  }
  if (`${WeatherMain}` === "Rain") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/sub-cloud-rain.png";
  }
  if (`${WeatherMain}` === "Snow") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/snow.png";
  }
  if (`${WeatherMain}` === "Thunderstorm") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/lightning-storm.png";
  }
  if (`${WeatherMain}` === "Drizzle") {
    let newImage = document.querySelector("#img-current-temp");
    newImage.src = "images/sub-cloud-rain.png";
  }
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-new-city");

  if (searchInput.value) {
    let newCity = document.querySelector("#current-city");
    newCity.innerHTML = `${searchInput.value}`;

    let apiUrlF = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrlF).then(showTemperature);
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
