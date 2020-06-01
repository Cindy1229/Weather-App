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

function celsiusToFahrenheit(temperature){
  return (temperature * 9/5)+32;
}

tempElement.addEventListener("click", function(){

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
