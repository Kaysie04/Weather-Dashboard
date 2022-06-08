// define variables of document elements
var searchInputEl = document.getElementById("search-input")
var searchFormEl = document.getElementById("search-form")
var searchBtn = document.getElementById("search-btn")
var searchHistory = []
var searchHistoryUl = document.getElementById("search-history-ul")



searchBtn.addEventListener("click", function() { 
    userSearch = searchInputEl.value
    searchHistory.push(userSearch)
    localStorage.setItem("searchName", JSON.stringify(searchHistory))

})


function searchHistoryDisplay () {
    var getStorage = JSON.parse(localStorage.getItem("searchName"))
    for (let i = 0; i < getStorage.length; i++) {
        searchHistoryLi = document.createElement("li")
        searchHistoryUl.append(searchHistoryLi)
        searchHistoryLi.textContent = getStorage[i]
    }
    searchHistoryDisplay()
}













    
    
    







