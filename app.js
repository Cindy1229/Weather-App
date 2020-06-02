const notificationElement=document.querySelector(".notification");
const iconElement=document.querySelector(".weather-icon");
const tempElement=document.querySelector(".temperature-value p");
const descElement=document.querySelector(".temperature-description p");
const location=document.querySelector(".location p");

/*const weather={
  temperature: {
    value: 18,
    unit: "celsius"
  },
  description: "few clouds",
  iconId: "01d",
  city: "London",
  country: "GB"
};*/

//First check if the location is available
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
  notificationElement.style.display="block";
  notificationElement.innerHTML="<p>Browser doesn't support Geolocation</p>"";
}

//Set the current location
fucntion setPosition(position){
  let latitude=position.coords.latitude;
  let longitude=position.coords.longitude;

  //Get the weather info from the API
  getWeather(latitude, longitude);
}

//Show the error
function showError(error){
  notificationElement.style.display="block";
  notificationElement.innerHTML=`<p> ${error.message} </p>`;
}

//Convert C to F
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5)+32;
}

tempElement.addEventListener("click", function(){

  if(weather.temperature===undefined) return;
  if(weather.temperature.unit==="celsius"){
    let fahrenheit=celsiusToFahrenheit(weather.temperature.value);
    fahrenheit=Math.floor(fahrenheit);
    tempElement.innerHTML=`${fahrenheit}° <span>F</span>`;
    weather.temperature.unit="fahrenheit";

  }else{
    tempElement.innerHTML=`${weather.temperature.value}° <span>C</span>`;
    weather.temperature.unit="celsius";
  }
});
