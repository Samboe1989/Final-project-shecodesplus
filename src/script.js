//Date and time function

function formatDate(date) {
  let hours = date.getHours();
  let todayDate = date.getDate();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  currentTimeDate.innerHTML = `${day}, ${todayDate} ${month} | ${hours}:${minutes}`;
  return `${day}, ${todayDate} ${month} | ${hours}:${minutes}`;
}

let currentTimeDate = document.querySelector(".dateTime");
let currentTime = new Date();
currentTimeDate.innerHTML = formatDate(currentTime);

//Search function

function showWeather(response) {
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)} C°`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `Wind:${Math.round(response.data.wind.speed)}Km/h`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#cityInput").value;
  let apiKey = "6d9d93b7d32e34850e611e89547fc660";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity},&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", searchCity);

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6d9d93b7d32e34850e611e89547fc660";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl, "jujhuiuh");
  axios.get(apiUrl).then(showWeather);
}

//current Location

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#currentLocationButton");
locationButton.addEventListener("click", getLocation);
