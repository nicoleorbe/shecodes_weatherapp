let apiKey = "91f6bf18ce54b4e6a35e4e6af54b2317";

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

function formatEpoch(timestamp) {
  let date = new Date(timestamp * 1000);

  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let weekday = weekdays[date.getDay()];

  return `${weekday}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  console.log(response.data.daily);

  let forecastHTML = `<div class="row">`;
  //let days = ["Thur", "Fri", "Sat"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      let weather = forecastDay.weather[0].main;
      console.log(weather);

      if (weather === "Clouds") {
        image = "images/cloud.png";
      } else if (weather === "Rain") {
        image = "images/sun-cloud-rain.png";
      } else if (weather === "Snow") {
        image = "images/snow.png";
      } else if (weather === "Thunderstorm") {
        image = "images/lightning-storm.png";
      } else if (weather === "Drizzle") {
        image = "images/sun-cloud-rain.png";
      } else {
        image = "images/sunny.png";
      }

      let maxTemp = Math.round(forecastDay.temp.max);
      let minTemp = Math.round(forecastDay.temp.min);

      forecastHTML =
        forecastHTML +
        `       <div class="col-2">
              <div class="forecast-date">${formatEpoch(forecastDay.dt)}</div>
              <img
                src="${image}"
                alt=""
                class="forecast-image"
                id="forecast-image"
              />
              <div class="forecast-temperature">
                <span
                  class="forecast-temperature-max"
                  id="forecast-temperature-max"
                  ><strong>${maxTemp}°</strong></span
                >
                /
                <span
                  class="forecast-temperature-min"
                  id="forecast-temperature-min"
                  >${minTemp}°</span
                >
              </div>
            </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiForecastURL = "281450ec88936f4fa8ee9864682b49a0";

  let apiSearchURLForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiForecastURL}`;
  console.log(apiSearchURLForecast);
  axios.get(apiSearchURLForecast).then(displayForecast);
}

//display weather for searched city .... rename for "searched weather"
function showTemperature(response) {
  let showTemp = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${showTemp}`;

  let weatherDescription = response.data.weather[0].description;
  let weather = document.querySelector("#current-weather");
  weather.innerHTML = `${weatherDescription}`;

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
  if (`${weatherMain}` === "Clouds") {
    newImage.src = "images/cloud.png";
  } else if (`${weatherMain}` === "Rain") {
    newImage.src = "images/sun-cloud-rain.png";
  } else if (`${weatherMain}` === "Snow") {
    newImage.src = "images/snow.png";
  } else if (`${weatherMain}` === "Thunderstorm") {
    newImage.src = "images/lightning-storm.png";
  } else if (`${weatherMain}` === "Drizzle") {
    newImage.src = "images/sun-cloud-rain.png";
  } else {
    newImage.src = "images/sunny.png";
  }

  let myEpochTime = response.data.dt;
  let myTime = new Date(myEpochTime * 1000);
  let myHours = new Date(myTime).getHours();
  let body = document.querySelector("body");
  let footerColor = document.querySelector("footer");
  let gradient;

  if (`${myHours}` >= 21 && `${myHours}` <= 4) {
    gradient = "linear-gradient(to top, #09203f 0%, #537895 100%)";
    footerColor.classList.remove("footer");
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

  getForecast(response.data.coord);
}

function search(city) {
  if (city) {
    let newCity = document.querySelector("#current-city");
    newCity.innerHTML = `${city}`;

    let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrlSearch).then(showTemperature);

    let celsiusLink = document.querySelector("#degree-C");
    let fahrenheitLink = document.querySelector("#degree-F");
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
  }
}

function citySubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-new-city");
  console.log(searchInput);
  search(searchInput.value);
}

//display Celsius when C° is selected
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");

  let myTemp = Math.round((showFahrenheit - 32) / 1.8);

  let celsiusLink = document.querySelector("#degree-C");
  let fahrenheitLink = document.querySelector("#degree-F");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  temperatureElement.innerHTML = `${myTemp}`;
}

//display Fahrenheit when F° is selected
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");

  let celsiusLink = document.querySelector("#degree-C");
  let fahrenheitLink = document.querySelector("#degree-F");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(showFahrenheit);
}

let showFahrenheit = null;

let searchCity = document.querySelector("#search-bar");
searchCity.addEventListener("submit", citySubmit);

let displayTempF = document.querySelector("#degree-F");
displayTempF.addEventListener("click", displayFahrenheit);

let displayTempC = document.querySelector("#degree-C");
displayTempC.addEventListener("click", displayCelsius);

navigator.geolocation.getCurrentPosition(function (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let cityName = data.address.city;
      console.log(cityName);
      search(cityName);
    });
});

function resetPage() {
  location.reload();
}
