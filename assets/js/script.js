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

// assigning my created API Key on website to a constant
const APIKey = "1379210649a22287bd5aad61bdde19be";

var getWeatherData = function(userSearch) {
// get request from weather API 
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&appid" + APIKey;
fetch(queryUrl)
.then(function => response() {
    // display response 

})

}






searchBtn.addEventListener("click", function() { 
    userSearch = searchInputEl.value
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














    
    
    







