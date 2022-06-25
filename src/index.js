function formatDate() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  return `${time}`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#users-input-city").value;
  let apiKey = "e2ea1399166955bf4ca430b68fc06cd5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showInputCityTemperature);
}

function showInputCityTemperature(response) {
  let string = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("h1").innerHTML = string;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#icon_current").innerHTML =
    response.data.weather[0].icon;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPositionWeather);
}

function getCurrentPositionWeather(position) {
  let apiKey = "6b45fead1f572a2847620f61855bb862";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showInputCityTemperature);
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = document.querySelector("#current-day");
day.innerHTML = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = document.querySelector("#current-date");
date.innerHTML = now.getDate();

let month = document.querySelector("#current-month");
month.innerHTML = months[now.getMonth()];

let year = document.querySelector("#current-year");
year.innerHTML = now.getFullYear();

let time = document.querySelector("#current-time");
time.innerHTML = formatDate();

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

let currentPosisitionButton = document.querySelector("#button-geoposition");
currentPosisitionButton.addEventListener("click", getCurrentLocation);
