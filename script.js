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
     //----or----
    //if the enter key is pressed, then fire the search btn click event.
    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            $("#search-btn").click();
        }
    });










