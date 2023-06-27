const API_KEY = "47de525c8b6e8be1118dc5ace4b3687a"; //should be private, but no server, nothing to hide btw.

const city = "Arad";
const source = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`; 



const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");


 formEl.addEventListener("submit", (event) => {
  event.preventDefault();   
  const cityValue = cityInputEl.value;
        getWetherData(cityValue);

  });  

async function getWetherData(cityValue) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}&units=metric`)   

    if(!response.ok) {
      throw new Error("Network respose was not ok")
    }

    const data = await response.json();
    
    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;


    const details = [
      `Feels like: ${Math.round(data.main.feels_like)} °C`,
      `Humidity: ${data.main.humidity} %`,
      `Wind speed: ${data.wind.speed} km/h`,
    ]


    weatherDataEl.querySelector (
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" 
    alt="weather icon">`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details
    .map((details) => `<div>${details}</div>`)
    .join("");


    
  } catch (error) {
    weatherDataEl.querySelector ( ".icon" ).innerHTML = "";
    weatherDataEl.querySelector(".temperature" ).textContent = "temp";
    weatherDataEl.querySelector(".description").textContent = "Please enter the city name correctly";
    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}   