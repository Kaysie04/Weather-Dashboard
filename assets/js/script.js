// define variables of document elements
var searchInputEl = document.getElementById("search-input")
var searchFormEl = document.getElementById("search-form")
var searchBtn = document.getElementById("search-btn")
var searchHistory = JSON.parse(localStorage.getItem("searchName")) || []
var searchHistoryList = document.getElementById("search-history-list")



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














    
    
    







