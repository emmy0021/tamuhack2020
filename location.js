var access_key = '145a6e1f8118cacc7daf96e2b3f5ab42';
var ip = 'check';
var city = '';
var lon = '';
var lat = '';

console.log("working");

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
    document.getElementById("lon").innerText = "longitide:" + lon;
    document.getElementById("lat").innerText = "latitude:" + lat;

}