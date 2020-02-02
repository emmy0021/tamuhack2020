var weather;
var api = 'https://api.openweathermap.org/data/2.5/weather?';
var apiKey = '&APPID=8697cfa385dec17d993f302610135c81';

function setup() {
	createCanvas(400, 200);
	var button = select('#submit');
	button.mousePressed(weatherAsk);
	var lat = document.getElementById("lat");
	var lon =  document.getElementById("lon");
}

function weatherAsk() {
	var latitude = 'lat=' + lat.value;
	var longitude = '&lon=' + lon.value;
	var url = api + latitude + longitude + apiKey;
	loadJSON(url, gotData);
}
function gotData(data) {
	weather = data;
}

function draw() {
	if (weather) {
		var announce = "The temperature is ";
		var temp = weather.main.temp;
		document.getElementById("temp").innerHTML = announce + temp;
  }
}