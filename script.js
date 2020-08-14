$(document).ready(function() {

    var inputCity = "";
    // APIKey
    var APIKey = "b9813bb0127cfb8dd408b55009022372";  

    initDoc();

    
    //search button
    $("#search-btn").on("click", function() {
            if (saveCityList()) {
                retrieveWeather(true);
            };

    });
     
    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            $("#search-btn").click();
        }
    });

    
    $(document).on("click","td", function(e){
        inputCity = e.target.innerHTML;
        saveLastCitySearched(inputCity);
        retrieveWeather(false);
    });
    //*****END CLICKING EVENTS *****/









