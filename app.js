//Select elements
const iconElement=document.querySelector(".weather-icon");
const tempElement=document.querySelector(".temperature-value p");
const descElement=document.querySelector(".temperature-description p");
const locationElement=document.querySelector(".location p");
const notificationElement=document.querySelector(".notification");

//API key: 672a1acbfbd8f8852bd51abc05329ca8
const KELVIN=273;
const key="672a1acbfbd8f8852bd51abc05329ca8";

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

//Weather object
const weather={};
weather.temperature={
  unit: "celsius"
}

//First check if the location is available
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
  notificationElement.style.display="block";
  notificationElement.innerHTML="<p>Browser doesn't support Geolocation</p>";
}

//Set the current location
function setPosition(position){
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

//Get weather info from the API
function getWeather(latitude, longitude){
  let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api).then(function(response){
    let data=response.json();
    return data;
  })
  .then(function(data){
    weather.temperature.value=Math.floor(data.main.temp - KELVIN);
    weather.description=data.weather[0].description;
    weather.iconId=data.weather[0].icon;
    weather.city=data.name;
    weather.country=data.sys.country;
  })
  .then(function()){
    displayWeather();
  }
}

//Display the weather info to UI
function displayWeather(){
  iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML=`${weather.temperature.value}° <span> C</span> `;
  descElement.innerHTML=weather.description;
  locationElement.innerHTML=`${weather.city}, ${weather.country}`;
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
