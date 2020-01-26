document.getElementById("rep").addEventListener("click", reportFire); 
document.getElementById("y").addEventListener("click", getGeolocation); 
document.getElementById("n").addEventListener("click", hide); 


function reportFire() {
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("geoloc").style.visibility = "visible";
}
function getGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } 
    else{
        hide();
        console.log('unsupported')
        document.getElementById("geoloc").innerHTML = "Location retrieval unsupported by device"
    }
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    alert("Thank you for your submission")
    hide();
    console.log(latitude);
    console.log(longitude);
}

function onError(error){
    console.log(error);
    hide();
    document.getElementById("geoloc").innerHTML = "Error has occurred retrieving geolocation"
}

function hide() {
    document.getElementById("geoloc").style.visibility = "hidden";
    document.getElementById("confirm").style.visibility = "hidden";
}

function show() {
    document.getElementById("geoloc").style.visibility = "visible";
    document.getElementById("confirm").style.visibility = "visible";
}