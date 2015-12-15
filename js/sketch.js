var canvas;
var base_url = "http://api.openweathermap.org/data/2.5/forecast/daily";
var city_url ="?q=Miami";
var mode = "&mode=json";
var app_id = "&appid=bb48464807bd02b5a455107f3daba9ea";
var fUnits = "&units=imperial";
var cUnits = "&units=metric";
var temp;
var temp_min;
var temp_max;
var cityName;
var day;
var wind;
var position;
var humidity;
var code;
var json;
var count = "&cnt=";



function setup() {
    var canvas = createCanvas(1000, 120);
    canvas.parent('canvas');
    // Can we set the canvas to an existing DOM element??

    // Request the data from openweathermap
    //cityName = createInput();
    var searchButton = createButton('Search City');
    //cityName.parent('left_panel')
    //paddingAmount.parent('left_panel);
    searchButton.parent('right_panel');
    searchButton.mousePressed(weatherLookup);

    position = createVector(width/2, height/2);
    // wind starts as (0,0)
    wind = createVector();
}

function draw() {
//background(200);

  // This section draws an arrow pointing in the direction of wind
    clear();
  push();
  translate(32, height - 32);
  // Rotate by the wind's angle
  rotate(wind.heading() + PI/2);
  noStroke();
  fill(255);
  ellipse(0, 0, 48, 48);

  stroke(45, 123, 182);
  strokeWeight(3);
  line(0, -16, 0, 16);

  noStroke();
  fill(45, 123, 182);
  triangle(0, -18, -6, -10, 6, -10);
  pop();
  
  // Move in the wind's direction
  position.add(wind);
  
  stroke(0);
  fill(0);
  ellipse(position.x, position.y, 16, 16);

  if (position.x > width)  position.x = 0;
  if (position.x < 0)      position.x = width;
  if (position.y > height) position.y = 0;
  if (position.y < 0)      position.y = height;
    
}


function weatherLookup() {
    cityName = $("#left_panel").val();
    day = $("#middle_panel").val();
    city_url = "?q=" + cityName;
    var count_url = count + day;
    var url = base_url + city_url + count_url + app_id;
    var unitSelected = $('input[name=tempScale]:checked').val();
    if (unitSelected == "F") {
        url = url + fUnits;
    } else {
        url = url + cUnits;
    }
    loadJSON(url, gotWeather);
}

function gotWeather(weather) {
    
    console.log(weather);
    

    //temp = weather.main.temp;
    temp = weather.list[weather.list.length-1].temp.day;
    //humidity = weather.list[weather.list.length-1].humidity;

    // Get the angle (convert to radians)
    var angle = radians(Number(weather.list[weather.list.length-1].deg));
    // Get the wind speed
    var windmag = Number(weather.list[weather.list.length-1].speed);


    // Make a vector
    wind = p5.Vector.fromAngle(angle);

    //select("#city").html(cityName);
    select("#city").html("In " + day + " day(s), " + cityName + " will feel like:");
    var unitSelected = $('input[name=tempScale]:checked').val();
    if (unitSelected == "F") {
        select("#temp").html("Temperature: " + temp +""+"&#176; F");
        select("#winDiv").html("Wind: " + windmag + " mph");
    } else {
        select("#temp").html("Temperature: " + temp +""+"&#176; C");
        select("#winDiv").html("Wind: " + windmag + " mps");
    }

    //select("#humidity").html("Humidity: " + humidity + "%");

    var code = weather.list[weather.list.length-1].weather[0].id;
    
    console.log(code);
//    code = 804;
    if (code >= 200 && code < 300) {
        //$("#wimg").attr = ("src","../img/thunderstorms.png");
        $('#imgdiv').html('<img class="image" src="../img/thunderstorms2.png" alt="thunderstorms">');
        $("#recommendation").text("Recommendation: Definitely not a good day to film outside. You may want to consider indoor shooting. Severe damage to equipment can occur. Expect heavy thunderstorms with light and heavy drizzle to ragged thuderstorms with light and heavy rain.");
    } else if (code >= 300 && code < 322) {
        $('#imgdiv').html('<img class="image" src="../img/drizzle2.png" alt="drizzle">');
        $("#recommendation").text("Recommendation: Not a good day to film outside. You may want to consider indoor shooting. If you have to shoot outside, protect your gear with appropriate covering. Expect heavy shower to light drizzle.");
    } else if(code >= 500 && code < 505) {
        $('#imgdiv').html('<img class="image" src="../img/heavyrain.png" alt="heavyrain">');
        $("#recommendation").text("Recommendation: Not a good day to film outside. Expect light to extreme rainfall, so make sure you have the appropriate gear to protect your equipment and yourself.");
        } else if(code >= 511 && code < 531) {
        $('#imgdiv').html('<img class="image" src="../img/freezing-rain2.png" alt="freezing_rain">');
        $("#recommendation").text("Recommendation: High risk to yourself and your equipment. Conditions are not conducive for filming. Expect light to heavy, intense, and freezing rain.");
    } else if(code >= 600 && code < 623) {
        $('#imgdiv').html('<img class="image" src="../img/snow2.png" alt="snow">');
         $("#recommendation").text("Recommendation: Depending on what you plan on filimg, you may want to exercise caution while filming today. You can expect light to heavy snow. These cold conditions can drain your batteries and cause heavy condensation in your camera when going from outside to indoors. If temperatures drop below -25F, your lcd screens can crack.");
    }    else if(code >= 800 && code < 803) {
        $('#imgdiv').html('<img class="sun" src="../img/clearsky.png" alt="clearsky">');
         $("#recommendation").text("Recommendation: It's a great day to make a movie! Expect sunny skies with the possibility of a few scattered clouds.");
    }    else if(code >= 804) {
        $('#imgdiv').html('<img class="image"  src="../img/overcast.png" alt="overcast">');
         $("#recommendation").text("Recommendation: It's a good day to make a movie, however you may want to bring along your lights and reflectors. Expect overcast skies!");
    }
    
    else {
    }

}