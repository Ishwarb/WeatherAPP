var canvas;
var base_url = "http://api.openweathermap.org/data/2.5/forecast";
var city_url ="?q=Miami"; 
var app_id = "&appid=bb48464807bd02b5a455107f3daba9ea";
var fUnits = "&units=imperial";
var cUnits = "&units=metric";
var temp;
var temp_min;
var temp_max;
var cityName;



function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  // Request the data from openweathermap
  cityName = createInput();
  var searchButton = createButton('Search City');
    cityName.parent('left_panel')
    //paddingAmount.parent('left_panel);
    searchButton.parent('right_panel');
    searchButton.mousePressed(weatherLookup);

 
}


function weatherLookup() {
    city_url = "?q=" + cityName.value();
    var url = base_url + city_url + app_id;
    var unitSelected = $('input[name=tempScale]:checked').val();
    if (unitSelected == "F") {
        url = url + fUnits;
    } else {
        url = url + cUnits;
    }
    loadJSON(url, gotWeather);
}
    
//function draw() {
//  if (temp) {
//   text(temp,width/2,height/2); 
//  }
//}

function gotWeather(weather) {
  //Position 0 is the first item in the list
  //each one is 3 hours apart
    console.log(weather);
  temp = weather.list[0].main.temp;
//  temp_min = weather.list[0].main.temp_min;
//  temp_max = weather.list[0].main.temp_max;
  humidity = weather.list[0].main.humidity;

 
    select("#city").html(cityName.value());
    select("#temp").html(temp +""+"&#8457;");
//    select("#temp-min").html(temp_min);
//    select("#temp-max").html(temp_max);
    select("#humidity").html(humidity);
}