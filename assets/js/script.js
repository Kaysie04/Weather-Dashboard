

// define variables of document elements
var searchInputEl = document.getElementById("search-input")
var searchFormEl = document.getElementById("search-form")
var searchBtn = document.getElementById("search-btn")
var searchHistory = JSON.parse(localStorage.getItem("searchName")) || []
var searchHistoryList = document.getElementById("search-history-list")
var todaysWeatherEl = document.getElementById("todays-weather")
var cityDateEl = document.getElementById("city-date")
var tempEl = document.getElementById("temp")
var feelsLikeTempEl = document.getElementById("feels-like")
var windEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var UVIndexEl = document.getElementById("UV-index")
var weatherDisplayEl = document.querySelector(".weather-display-section")
var historyForecastDisplayEl = document.querySelector(".history-forecast-section")

// function to get and display data from API

var getWeatherData = function(userSearch) {

    // assigning my created API Key on website to a constant
const APIKey = "1379210649a22287bd5aad61bdde19be";
   
    // set variable to API depending on what city is search

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + userSearch + "&APPID=" + APIKey;

    // fetch request from weather API 
    fetch(queryUrl)
    .then(response => { 
        if (response.ok) { 
            return response.json()
        } else { throw new Error("city name invalid")
        }
    }).catch(function (error) {alert(error)
        return
    })
    .then(data => {
        if (!searchHistory.includes(userSearch)) {
            searchHistory.push(userSearch)
            localStorage.setItem("searchName", JSON.stringify(searchHistory))
            searchHistoryDisplay()
            }
        
        //console.log(data)

        // display data on elements

        // setting current date to a variable, multiply by 1000 because dt is UNIX time
        let currentDate = new Date(data.dt *1000)
        let date = currentDate.getDate()
        let month = currentDate.getMonth()
        let year = currentDate.getFullYear()
        todaysWeatherEl.textContent = data.name + " " + month + "/" + date + "/"  + year

        // retrieve icon dependent on current weather
          let weatherIcon = data.weather[0].icon
            weatherIconImg = document.createElement("img")
            weatherIconImg.setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
            todaysWeatherEl.append(weatherIconImg)

        // display current temp
           tempEl.innerHTML = "Temperature:" + " " + data.main.temp + " " + '\u00B0F'

           // display feels like temp
           feelsLikeTempEl.innerHTML = "Feels Like:" + " " + data.main.feels_like + " " + '\u00B0F'

        // display current wind mph
            windEl.innerHTML= "Wind Speed:" + " " + data.wind.speed + "mph"

        // display current humidity %
            humidityEl.innerHTML = "Humidity:" + " " + data.main.humidity + "%"

        // display current uv-index

            // define latitude and longitude because those are required to get the UV value
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var UVQueryUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&APPID=" + APIKey; // + "&cnt=1";
            // fetch request from weather API 
            fetch(UVQueryUrl)
            .then(response => response.json())
            .then(data => {
    
         //  color-code the uv index values dependent on value
                var UVIndexValue = document.createElement("span")           
                if (data[0].value <=2) {
                    UVIndexEl.setAttribute("class", "badge badge-success")
                } else if (data[0].value >=3 && data[0].value <=7) {
                UVIndexValue.setAttribute("class", "badge badge-warning")
                } else {
                UVIndexValue.setAttribute("class", "badge badge-warning")
                }

                UVIndexEl.innerHTML = "UV Index:" + " "
                UVIndexValue.innerHTML = data[0].value
                UVIndexEl.append(UVIndexValue)
            })


         
         
        
            
            

        // five day forecast 
        var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + userSearch + "&APPID=" + APIKey;
        fetch(fiveDayQueryUrl)
        .then(response => response.json())
        .then (data => {
            console.log(data)
        })

    }) 
}

searchBtn.addEventListener("click", function() { 
    weatherDisplayEl.classList.remove("weather-display-section")
    //historyForecastDisplayEl.classList.remove("history-forecast-section")
    userSearch = searchInputEl.value
    getWeatherData(userSearch);
})

searchHistoryDisplay()

function searchHistoryDisplay () {
    console.log(weatherDisplayEl)
    
    searchHistoryList.textContent = "";
    for (let i = 0; i < searchHistory.length; i++) {
         var searchHistoryItem = document.createElement("button")
        searchHistoryItem.className = "btn btn-secondary btn-xs btn-block" 
        searchHistoryItem.innerHTML = searchHistory[i]
        searchHistoryItem.setAttribute("value", searchHistory[i])
        searchHistoryList.append(searchHistoryItem)

        // be able to click a city in the search history and have its data populate on the page
        searchHistoryItem.addEventListener("click", function (event) {
            getWeatherData(event.target.value);
        })
    } 
}
