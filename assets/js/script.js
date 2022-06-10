// define variables of document elements
var searchInputEl = document.getElementById("search-input")
var searchFormEl = document.getElementById("search-form")
var searchBtn = document.getElementById("search-btn")
var searchHistory = JSON.parse(localStorage.getItem("searchName")) || []
var searchHistoryList = document.getElementById("search-history-list")
var todaysWeatherEl = document.getElementById("todays-weather")
var cityDateEl = document.getElementById("city-date")
var tempEl = document.getElementById("temp")
var windEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var UVIndexEl = document.getElementById("UV-index")






// function to get and display data from API

var getWeatherData = function(userSearch) {

    // assigning my created API Key on website to a constant
const APIKey = "1379210649a22287bd5aad61bdde19be";
   
    // set variable to API depending on what city is search

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + userSearch + "&APPID=" + APIKey;

    // fetch request from weather API 
    fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        // display data on elements

        // setting current date to a variable, multiply by 1000 because dt is UNIX time
        let currentDate = new Date(data.dt *1000)
        let date = currentDate.getDate()
        let month = currentDate.getMonth()
        let year = currentDate.getFullYear()
        todaysWeatherEl.textContent = data.name + " " + month + "/" + date + "/"  + year

        // retrieve icon dependent on current weather
          let weatherIcon = data.weather[0].icon
          console.log(weatherIcon)
            weatherIconImg = document.createElement("img")
            weatherIconImg.setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
            todaysWeatherEl.append(weatherIconImg)


        // display current temp
           tempEl.innerHTML = "Temperature:" + " " + data.main.temp + " " + '\u00B0F'


        // display current wind mph
            windEl.innerHTML= "Wind Speed:" + " " + data.wind.speed + "mph"

        // display current humidity %
            humidityEl.innerHTML = "Humidity:" + " " + data.main.humidity + "%"

        // display current uv-index
            //UVIndexEl.textContent = "UV Index" + " " 

    }) 
}

searchBtn.addEventListener("click", function() { 
    userSearch = searchInputEl.value
    getWeatherData(userSearch);
    searchHistory.push(userSearch)
    localStorage.setItem("searchName", JSON.stringify(searchHistory))
    searchHistoryDisplay()
})

function searchHistoryDisplay () {

    searchHistoryList.textContent = "";
    for (let i = 0; i < searchHistory.length; i++) {
         var searchHistoryItem = document.createElement("div")
        searchHistoryItem.textContent = searchHistory[i]
        searchHistoryList.append(searchHistoryItem)
    }
    
    
}
