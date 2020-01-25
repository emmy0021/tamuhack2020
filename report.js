function reportFire() {
    var btn = document.createElement('input');
    btn.setAttribute('type', 'button'); // input element of type button
    btn.setAttribute('value', 'FINISH GAME');
    btn.onclick = getGeolocation();
    document.body.appendChild(btn);
    document.getElementById("report").innerHTML = "Allow access to your geolocation?"
    // yes.innerHTML("Yes")
    // yes.addEventListener('click', getGeolocation())
    // no.innerHTML("No")
    // no.addEventListener('click',hideButt())
    // var div = document.getElementById("geoloc")
    
    // div.appendChild(yes);
    // div.appendChild(no);
    

}
function getGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);    } 
    else{
        console.log('unsupported')
    }
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;

    console.log(latitude);
    console.log(longitude);
}

function onError(error){
    console.log(error);
}
