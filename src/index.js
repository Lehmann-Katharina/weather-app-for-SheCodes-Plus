//add current Date
function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let hour = now.getHours();
  if (hour < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = document.querySelector("#currentDate");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

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
  let month = months[now.getMonth()];

  currentDate.innerHTML = `${day} - ${month} ${date} - ${hour}:${minutes}`;
}
formatDate();

//#1 city search
function handleSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  let city = `${searchInput.value}`;
  let h5 = document.querySelector("h5");

  h5.innerHTML = city;

  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//search city and show Temperature

function searchCity(city) {
  let apiKey = "7c5a6c2ab59b7561795113f8a11b09a5";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let output = `${temperature} °C`;
  let h4 = document.querySelector("h4");

  h4.innerHTML = output;
  console.log(output);

  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

//current Location Button

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "7c5a6c2ab59b7561795113f8a11b09a5";
  let units = "metric";

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
