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
          

             var latValue = todaysWeather.coord.lat;
             var lonValue = todaysWeather.coord.lon;
 
             var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latValue + "&lon=" + lonValue;


             $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function(uvWeather) {
                
                var uvValue = uvWeather.value;
                
                //get the uv colors based on the uv index
                var uvColor = "";
                if (uvValue < 3){
                    uvColor = "lowuv"
                }
                else if (uvValue < 6){
                    uvColor = "mediumuv"                    
                }
                else if (uvValue < 8){
                    uvColor = "highuv"                    
                }                
                else if (uvValue < 11){
                    uvColor = "veryhighuv"                    
                }                  
                else {
                    uvColor = "extremelyhighuv"                    
                };

                var newSpan = $("<span>",{class: uvColor, text: uvValue});                        
                newP4.append(newSpan);
                newDiv.append(newH4, newP1, newP2, newP3, newP4);
                $("#todays-weather").append(newDiv);
            });
        });


    }

    //function builds the five day forecast
    
    function buildFiveDayForecast () {

        var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + "&appid=" + APIKey;
        

        // builds 5 different cards using forecast
        $.ajax({
            url: fiveDayURL,
            method: "GET"
          }).then(function(fiveDaysWeather) {
            console.log(fiveDaysWeather);
            $("#fivedaywords").empty();
            $("#fivedaysection").empty();        
    
            $("#fivedaywords").text("5-Day Forecast");

            
            var element3PMFirstAppears = 0;
            for (i = 0; i < 8; i++) {
                if (fiveDaysWeather.list[i].dt_txt.includes("15:00:00")) {
                    element3PMFirstAppears = i;
                    break;
                }
            }









