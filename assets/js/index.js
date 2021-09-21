//---Declared Variables---//
var currentDate = (moment().format("dddd, MMMM D, YYYY"));

var apiKey = "50ba35b451e58d2b8a2ec99ebcab0d37";



//---Get Current Weather Function---//
function getWeather(city) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" 
    + city
    + "&units=imperial&appid="
    + apiKey
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var name = data.city.name;
      var icon = data.list[0].weather[0].icon;
      var description = data.list[0].weather[0].description;
      var temp = data.list[0].main.temp;
      var humidity = data.list[0].main.humidity;
      var speed = data.list[0].wind.speed;

      console.log(name,description,icon,temp,humidity,speed);

      document.querySelector(".name").innerHTML = name + " (" + currentDate + ")";
      document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      document.querySelector(".description").innerHTML = "Weather Conditions: " + description;
      document.querySelector(".temp").innerHTML = "Temperature: " + temp + "° F";
      document.querySelector(".humidity").innerHTML = "Humidity Level: " + humidity + " %";
      document.querySelector(".speed").innerHTML = "Wind Speed: " + speed + " MPH"; 

    })
  
}

//---Get 5 Day Forcast Function---//
function dayForcasts(city) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" 
    + city
    + "&cnt=5&units=imperial&appid="
    + apiKey
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var name = data.city.name;
      var icon = data.list[0].weather[0].icon;
      var description = data.list[0].weather[0].description;
      var temp = data.list[0].main.temp;
      var humidity = data.list[0].main.humidity;
      var speed = data.list[0].wind.speed;

      console.log(name,description,icon,temp,humidity,speed);

       

    })
  
}




