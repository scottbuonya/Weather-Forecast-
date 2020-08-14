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
   
    
    function retrieveWeather(needCity){
        if (needCity) {
            getInputCity()
        }
        
        buildTodaysWeather();
        buildFiveDayForecast();
    };

   //current weather function
    function buildTodaysWeather () {
        var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity +"&appid=" + APIKey;

        $.ajax({
            url: currentWeatherURL,
            method: "GET"
          }).then(function(todaysWeather) {

            
            $("#todays-weather").empty();
           
            var newDiv = $("<div>").addClass("card-body");
            
            var newH4 = $("<h4>",{class: "card-title", text: inputCity + " (Current) "});  
            
            var icon =todaysWeather.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            var newI = $("<img>").attr("src", iconURL);            
            newH4.append(newI);
          
             //temp, converted from kelvin
             var tempFromKelvin = (todaysWeather.main.temp - 273.15) * 1.80 + 32
             var newP1 = $("<p>",{class: "card-text", text: "Temperature: " + tempFromKelvin.toFixed(1) + " °F"}); 
             
             var newP2 = $("<p>",{class: "card-text", text: "Humidity: " + todaysWeather.main.humidity +"%"});
             
             var newP3 = $("<p>",{class: "card-text", text: "Wind Speed: " + todaysWeather.wind.speed + " MPH"});                
             
             var newP4 = $("<p>",{class: "card-text", text: "UV Index: "});









