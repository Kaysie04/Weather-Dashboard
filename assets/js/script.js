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

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&APPID=" + APIKey;

    // fetch request from weather API 
    fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
        //console.log(data)

        // display data on elements
        let currentDate = new Date(data.dt *1000)
        let date = currentDate.getDate()
        let month = currentDate.getMonth()
        let year = currentDate.getFullYear()
        todaysWeatherEl.textContent = data.name + " " + month + "/" + date + "/"  + year 
        

    })
    
    // cal = Calendar.getInstance();    
    // Date d = cal.getTime();


    // const currentDate = new Date(response.data.dt * 1000);
    // const day = currentDate.getDate();
    // const month = currentDate.getMonth() + 1;
    // const year = currentDate.getFullYear();
    // nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
    

   
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
