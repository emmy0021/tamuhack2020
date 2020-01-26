var access_key = '145a6e1f8118cacc7daf96e2b3f5ab42';
var ip = 'check';
var city = '';
var lon = '';
var lat = '';
var temp;

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
    var get = select('#get');
    get.mousePressed(getData);
}

function weatherAsk() {
    var latitude = 'lat=' + lat;

	var longitude = '&lon=' + lon;
	var url = api + latitude + longitude + apiKey;
	
	loadJSON(url, gotData);
}
function gotData(data) {
    weather = data;
    temp =weather.main.temp;
    console.log(temp);
    writeData();
}


  // Initialize Firebase

  firebase.initializeApp({
    apiKey: "AIzaSyCp__3sbc1Bj2B0h7Owyn_6KYH79XqkzC0",
    authDomain: "tamuhack2020-69538.firebaseapp.com",
    databaseURL: "https://tamuhack2020-69538.firebaseio.com",
    projectId: "tamuhack2020-69538",
    storageBucket: "tamuhack2020-69538.appspot.com",
    messagingSenderId: "489082793913",
    appId: "1:489082793913:web:918e698329f4482a1f1068",
    measurementId: "G-SBWE9WF6DT"
  });
  firebase.analytics();

  function writeData(){
      firebase.database().ref("coord").set({
          Latitude: lat,
          Longitude: lon,
          Temperature: temp
      })
  }

  function getData(){
    firebase.database().ref('/').once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
           var childKey =  childSnapshot.key;
           var childData = childSnapshot.val();
           console.log(childData);
        });
    })
  }
