function resetPage() {
  location.reload();
}

let apiKey = "063f2d8d4205c00d9e83991e6beade04";

//display weather for current city
function showCurrentF(response) {
  let myTemp = Math.round(response.data.main.temp);
  let myCity = response.data.name;
  let myWeatherDescription = response.data.weather[0].description;
  let myWeatherMain = response.data.weather[0].main;
  let myHumidity = response.data.main.humidity;
  let myWind = response.data.wind.speed;

  myCurrentFahrenheit = Math.round(response.data.main.temp);

  let city = document.querySelector("#current-city");
  city.innerHTML = `${myCity}`;
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${myTemp}`;
  let weather = document.querySelector("#current-weather");
  weather.innerHTML = `${myWeatherMain}`;
  let wind = document.querySelector("#current-wind");
  wind.innerHTML = `Wind: ${myWind}mph`;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `Humidity: ${myHumidity}%`;
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

//switch to current location weather
//let currentButton = document.querySelector("#button-current");
//currentButton.addEventListener("click", getPosition);

//convert to celcius
function showMyCelsius(event) {
  event.preventDefault();
  let myTemp = Math.round((myCurrentFahrenheit - 32) / 1.8);

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${myTemp}`;
}

//let displayMyTempC = document.querySelector("#degree-C");
//displayMyTempC.addEventListener("click", showMyCelsius);

//let showMyFahrenheit = document.querySelector("#degree-F");
//showMyFahrenheit.addEventListener("click", getPosition);

//display weather for searched city
function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let WeatherDescription = response.data.weather[0].description;
  let WeatherMain = response.data.weather[0].main;
  let temperatureElement = document.querySelector("#current-temp");
  let weather = document.querySelector("#current-weather");
  let Humidity = response.data.main.humidity;
  let Wind = response.data.wind.speed;

  showFahrenheit = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = `${temp}`;
  weather.innerHTML = `${WeatherDescription}`;

  let wind = document.querySelector("#current-wind");
  wind.innerHTML = `Wind: ${Wind}mph`;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `Humidity: ${Humidity}%`;
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
