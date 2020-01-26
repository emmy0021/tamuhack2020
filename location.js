var access_key = '145a6e1f8118cacc7daf96e2b3f5ab42';
var ip = 'check';
var city = '';
var lon = '';
var lat = '';

var weather;
var api = 'https://api.openweathermap.org/data/2.5/weather?';
var apiKey = '&APPID=8697cfa385dec17d993f302610135c81';


document.addEventListener("DOMContentLoaded", function () {

    getLocation();
});

function getLocation() {
    $.ajax({
        url: 'http://api.ipstack.com/' + ip + '?access_key=' + access_key,
        dataType: 'jsonp',
        success: function (json) {

            // output the "capital" object inside "location"
            console.log(json);

            city = json.city;
            lat = json.latitude;
            lon = json.longitude;


            outputCity();
        }
    });
}

function outputCity() {
    document.getElementById("inputtext").value = city;
    document.getElementById("lon").innerText = lon;
    document.getElementById("lat").innerText = lat;

}

///weather
function setup() {
	createCanvas(400, 200);
	var button = select('#submit');
    button.mousePressed(weatherAsk);
    button.mousePressed(writeData);
}

function weatherAsk() {
    var latitude = 'lat=' + lat;

	var longitude = '&lon=' + lon;
	var url = api + latitude + longitude + apiKey;
	
	loadJSON(url, gotData);
}
function gotData(data) {
    weather = data;
    console.log(weather.main.temp);
}

// Your web app's Firebase configuration

