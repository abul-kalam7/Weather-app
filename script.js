const input = document.querySelector("#inputt");
const searchBtn = document.querySelector("#searchBtn");
const ctAndCountryName = document.querySelector(".ctAndCountryName")
const weatherIcon = document.querySelector(".weatherIcon")
const temperature = document.querySelector(".temperature")
const feelsLikeTemperature = document.querySelector(".feelsLikeTemperature")
const weatherCondition = document.querySelector(".weatherCondition")
const humidity = document.querySelector(".humidity")
const visibility = document.querySelector(".visibility")
const windSpeed = document.querySelector(".windSpeed")

const APIKEY = "268e216bb873fe6981ef5a08ae4506da";

async function getInfo(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

  try {
    const fetching = await fetch(url);
    const jsonData = await fetching.json();
    return jsonData;
  } catch (error) {
    console.log( error);   
  }
}

 async function searchHandelar() {
  const city = input.value.trim() ; 
  if (city) {
    const data = await getInfo(city); //   wait for the promise to resolve 
    ctAndCountryName.innerHTML = data.name + " , " + data.sys.country;
    temperature.innerHTML = Math.floor( data.main.temp) + "";
    feelsLikeTemperature.innerHTML = "Feels like&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + Math.floor( data.main.feels_like) + "°C"
    humidity.innerHTML = "Humidity&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + data.main.humidity
    visibility.innerHTML = "Visibility&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + data.visibility / 1000 + " km";
    windSpeed.innerHTML ="Wind Speed&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+Math.round( data.wind.speed * 3.6 ) + " kmh"
    let wc =  data.weather[0].main; 
    weatherCondition.innerHTML = "Weather condition&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + wc
   

    if(wc === "Clear"){
       weatherIcon.innerHTML = "☀️"
      }
          if (  wc   === "Clouds"){
        weatherIcon.innerHTML = "☁️"
       }
       else if ( wc === "Rain" ){
        weatherIcon.innerHTML = "🌧️"
      }
       else if ( wc === "Snow" ){
        weatherIcon.innerHTML = "❄️"
      } 

  } else {
    console.log("Please enter a city name");
  }
} 
searchBtn.addEventListener("click", async () => {
  await searchHandelar() 
  input.value = "";
});

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await searchHandelar()
    input.value = "";
  }
})

