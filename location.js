var access_key = '145a6e1f8118cacc7daf96e2b3f5ab42';
var ip = 'check';
var city = '';
var lon = '';
var lat = '';
var temp;
var heatmap, map;

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
            mapMe();
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
    temp = weather.main.temp;
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

function writeData() {
    firebase.database().ref("coord").set({
        Latitude: lat,
        Longitude: lon,
        Temperature: temp
    })
}

function getData() {
    firebase.database().ref('/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childData['Risk Level']);
            var txt = "City: " + JSON.stringify(city) + "\nLatitude: " + JSON.stringify(lat) + "\nCity: " + JSON.stringify(lon) + "\nRisk Level: " + JSON.stringify(childData['Risk Level']) + "\nTemperature: " + JSON.stringify(temp) + "K";
            alert(txt);
        });

    })
}


////////////////google maps stuff
function myMap() {


    var mapProp = {
        center: {
            lat: -40.807,
            lng: 142.0583
        },
        zoom: 4,
        mapTypeId: 'satellite',
        gestureHandling: 'cooperative'

    };

    map = new google.maps.Map(document.getElementById("map"), mapProp);

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });



    var icons = {
        fire: {
            icon: 'fire.png'
        }
    }

    //creating markers

    map.addListener('rightclick', function (e) {
        console.log(e.latlng, map);
        placeMarker(e.LatLng, map);
    });
}



function placeMarker(location, map) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function mapMe(){

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        map: map,
    });
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}
var latitude_list = [-11.807, -11.7924, -12.8398, -14.4306, -12.4953, -12.6191, -14.3655, -14.3195, -13.1654, -11.5473, -11.5417, -11.5471, -12.7626, -12.705, -13.1092, -14.0539, -12.6996, -12.7499, -12.7141, -12.7061, -13.8656, -12.6491, -13.1015, -12.6703, -13.3042, -13.2236, -13.2821, -13.2159, -13.2537, -12.4513, -12.4527, -12.544, -12.463, -12.5567, -12.5581, -13.2313, -13.2394, -13.2993, -13.3151, -15.3551, -15.3658, -14.2726, -15.4778, -14.3048, -14.308, -12.7613, -12.8447, -12.8782, -15.0081, -15.7637, -15.7678, -15.7699, -15.7863, -14.651, -14.6536, -14.6614, -14.727, -14.9422, -15.7616, -15.1411, -15.1317, -16.144000000000002, -15.1544, -16.1479, -16.1501, -16.1545, -16.1646, -15.1018, -15.1089, -15.1657, -15.1644, -15.5022, -15.4825, -15.4967, -15.5059, -15.485, -14.0156, -20.7333, -28.0219, -32.2111, -32.2088, -14.6671, -14.668, -14.6721, -14.6855, -14.6896, -14.7213, -16.0896, -16.0778, -16.1692, -14.6846, -29.6694, -29.429, -34.082, -31.2771, -32.4999, -32.8685, -33.7142, -33.6942, -33.6976];
var longitude_list = [142.0583, 142.085, 132.8744, 143.3035, 131.4897, 142.1998, 143.5682, 143.5198, 141.9715, 132.6796, 132.649, 132.6538, 142.1759, 133.907, 134.1848, 142.3327, 133.9138, 134.5251, 134.3991, 134.4077, 141.9771, 134.3953, 134.1926, 142.1102, 142.04, 141.9914, 142.4617, 142.002, 142.5242, 141.8071, 141.8162, 142.4455, 141.8241, 141.8979, 141.9071, 131.9106, 131.9032, 131.9598, 131.9569, 142.3028, 142.3113, 135.0443, 142.5924, 134.9182, 134.9367, 142.1666, 132.9017, 132.9177, 131.7665, 137.0728, 137.0335, 137.046, 137.0816, 130.5884, 130.5824, 130.6219, 130.6886, 131.8184, 137.0603, 131.1486, 131.1449, 136.7135, 131.1757, 136.6726, 136.6857, 136.7117, 136.6428, 130.5473, 130.5845, 129.9294, 129.9221, 130.6313, 130.4364, 130.6638, 130.623, 130.4285, 131.5979, 139.47899999999998, 148.1972, 146.7604, 146.7257, 126.7783, 126.7715, 126.8129, 126.7699, 126.8108, 126.7612, 125.9278, 125.9238, 125.9902, 126.7765, 116.5634, 115.0197, 116.7357, 115.845, 116.0805, 116.5515, 122.2123, 117.6054, 117.2918];

$('button#submit').click(function () {
    $.ajax({

        url: "http://127.0.0.1:5000/ret_data",
        type: "POST",
        success: function (response) {
            console.log(response);
            var stringified = JSON.stringify(response);
            var parsedObj = JSON.parse(stringified);

            console.log(parsedObj.lat);
            console.log(parsedObj.long);


            for (var i = 100; i < 36011; i++) {
                latitude_list.push(parsedObj.lat[i]);
                longitude_list.push(parsedObj.long[i]);
            }

            var mapProp = {
                center: {
                    lat: -40.807,
                    lng: 142.0583
                },
                zoom: 4,
                mapTypeId: 'satellite',
                gestureHandling: 'cooperative'

            };

            map = new google.maps.Map(document.getElementById("map"), mapProp);
            heatmap = new google.maps.visualization.HeatmapLayer({
                data: getPointsTwo(),
                map: map
            });
        }
    });
});


function getPoints() {
    console.log(latitude_list.length);
    var googleMapsPts = [];
    for (var i = 0; i < 1; i++) {
        googleMapsPts.push(new google.maps.LatLng(latitude_list[i], longitude_list[i]));
    }
    console.log(googleMapsPts.length);
    return googleMapsPts;
}

function getPointsTwo() {

    var googleMapsPts = [];
    for (var i = 1; i < 36011; i++) {
        googleMapsPts.push(new google.maps.LatLng(latitude_list[i], longitude_list[i]));
    }
    console.log(googleMapsPts.length);
    return googleMapsPts;
}
