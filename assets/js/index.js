//---Declared Variables---//
var currentDate = (moment().format("dddd, MMMM D, YYYY"));

var apiKey = "50ba35b451e58d2b8a2ec99ebcab0d37";

var searchBtn = document.querySelector(".searchBtn");

var historyEl = document.querySelector(".history");

var recentSearch = document.querySelector(".recentSearch");

var nameEl = document.querySelector(".name");

var tempEl = document.querySelector(".temp");

var iconEl = document.querySelector(".icon");

var descriptionEl = document.querySelector(".description");

var humidityEl = document.querySelector(".humidity");

var speedEl = document.querySelector(".speed");

var forecastCards = document.querySelector(".forecast");

var storageKey = 0;



//---Get Current Weather Function---//
function getWeather(userCity) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
    + userCity
    + "&units=imperial&appid="
    + apiKey
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      // console.log(data);

      var name = data.name;
      var icon = data.weather[0].icon;
      var description = data.weather[0].description;
      var temp = data.main.temp;
      var humidity = data.main.humidity;
      var speed = data.wind.speed;

      // console.log(name,description,icon,temp,humidity,speed);

      nameEl.innerHTML = name + " (" + currentDate + ")";
      iconEl.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      descriptionEl.innerHTML = "Weather Conditions: " + description;
      tempEl.innerHTML = "Temperature: " + temp + "° F";
      humidityEl.innerHTML = "Humidity Level: " + humidity + " %";
      speedEl.innerHTML = "Wind Speed: " + speed + " MPH"; 
    });
}

//---Get 5 Day Forcast Function---//
function dayForcasts(userCity) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" 
    + userCity
    + "&cnt=5&units=imperial&appid="
    + apiKey
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var today = new Date();
      var fDay = new Date();

      for (var i = 0; i < 5; i++) {
        fDay.setDate(today.getDate() + i);

        var ficon = data.list[i].weather[0].icon;
        var fdescription = data.list[i].weather[0].description;
        var ftemp = data.list[i].main.temp;
        var fhumidity = data.list[i].main.humidity;
        var fspeed = data.list[i].wind.speed;
        
        var resultContainer = document.createElement("div");
        var iconContainer = document.createElement("div");
        var resultDate = document.createElement("div");
        var resultIcon = document.createElement("img");
        var resultDescription = document.createElement("div");
        var resultTemp = document.createElement("div");
        var resultHumidity = document.createElement("div");
        var resultSpeed = document.createElement("div");

        resultContainer.classList.add("resultContainer");
        iconContainer.classList.add("flex");
        resultDescription.classList.add("resultDescription");

        resultIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + ficon + "@2x.png");

        resultDate.innerHTML = fDay.toDateString();
        resultTemp.innerHTML = "Temperature: " + ftemp + "° F";
        resultIcon.innerHTML = ficon;
        resultDescription.innerHTML = fdescription;
        resultHumidity.innerHTML = "Humidity Level: " + fhumidity + " %";
        resultSpeed.innerHTML = "Wind Speed: " + fspeed + " MPH";

        forecastCards.appendChild(resultContainer);
        resultContainer.appendChild(resultDate);
        resultContainer.appendChild(resultTemp);
        resultContainer.appendChild(iconContainer);
        iconContainer.appendChild(resultIcon);
        iconContainer.appendChild(resultDescription);
        resultContainer.appendChild(resultHumidity);
        resultContainer.appendChild(resultSpeed);
      }
    });
}

//---Event Listeners---//
searchBtn.addEventListener("click", searchWeather);

$(".history").on("click", ".recentSearch", function() {
  var userCity = this.textContent;
  getWeather(userCity);
  dayForcasts(userCity);
})

//---Load Weather Function---//
function searchWeather() {
  var userCity = document.querySelector(".userInput").value;

  getWeather(userCity);
  dayForcasts(userCity);

  localStorage.setItem(storageKey, userCity);
  storageKey = storageKey + 1;

  forecastCards.innerHTML = "";

  displaySearch();
}

//---Display Search Function---//
function displaySearch() {

  historyEl.innerHTML = "";

  for (var i =0; i < localStorage.length; i++) {

    var previous = localStorage.getItem(i);
    var historyContainer = document.createElement("ul");

    historyContainer.classList.add("recentSearch")

    historyContainer.innerHTML = previous;

    historyEl.appendChild(historyContainer);
  }
}

displaySearch();
