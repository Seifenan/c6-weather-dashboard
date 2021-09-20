var apiKey = "50ba35b451e58d2b8a2ec99ebcab0d37";

var userInput = document.querySelector("#userInput");

var searchBtn = document.querySelector("#searchBtn");

var userCity = userInput.value.trim();

function getWeather(userCity) {
  fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + apiKey
)
  .then(function(response) {
    return response.json();
  })
  
  console.log(userInput);

  // .then(function(data) {
  //   console.log(data);
  // });


}

  
  


//---Event Listeners---//

searchBtn.addEventListener("click", getWeather);
