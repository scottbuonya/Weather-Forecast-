$(document).ready(function(){
    $("#button-addon2").on("click", function(){
    var cityName = $("#citySearch").val()
    console.log(cityName)
    var cityList = $(".list-group")
    var newCity = $("<li class='list-group-item'></li>").text(cityName)
    cityList.prepend(newCity)
    })
})

//grabbing the ul 
//create a new list item with city name inside
//prepend new list item into ul





