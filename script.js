const search = document.querySelector("#search");
const seachBtn = document.querySelector("#search-btn");
const container = document.querySelector(".cities-container");

const error = document.getElementById("error");
const sortedTempList=[];

async function checkWeather(city) {
  const key = "9ff623f755d8241d797c89604c9eece7";
  const url = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  );

  const weatherData = await url.json();

  

  if (weatherData.cod === "404") {
    error.style.display = "block";
    setTimeout(function () {
      error.style.display = "none";
    }, 5000);
    }
    
    shortTemp(Math.round(weatherData.main.temp - 273.15))

  let weatherImg = "assets/wind.png";

  switch (weatherData.weather[0].description.toLowerCase()) {
    case "broken clouds":
      weatherImg = "assets/wind.png";
      break;
    case "clear sky":
      weatherImg = "assets/sun.png";
      break;
    case "rain":
      weatherImg = "assets/rain.png";
      break;
    case "mist":
      weatherImg = "assets/wind.png"; // Corrected the image for mist
      break;
    case "snow":
      weatherImg = "assets/rain.png"; // Corrected the image for snow
      break;
    default:
      weatherImg = "assets/rain.png";

      break;
  }

  const weatherBox = document.createElement("div");
  weatherBox.classList.add("waither-box");
  weatherBox.innerHTML = ` <img src="${weatherImg}" alt="wind">
    <h2 class="celcious">${Math.round(weatherData.main.temp - 273.15)}°C</h2>
    <span class="max-low-t">H ${Math.round(
      weatherData.main.temp_max - 273.15
    )}°C , m ${Math.round(weatherData.main.temp_min - 273.15)}°C</span>
    <span class="max-low-t">p ${weatherData.main.pressure}  h ${weatherData.main.humidity}wind ${(weatherData.wind.speed)}kmph</span>
    <div class="city-name">
        <p class="name">${weatherData.name}</p>
        <p class="waither">${weatherData.weather[0].description}</p>
    </div>`;

  container.appendChild(weatherBox);
}

seachBtn.addEventListener("click", () => {
  let value = search.value;
  checkWeather(value);
  search.value = "";
});

search.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    let value = search.value;
    checkWeather(value);
    search.value = "";
  }
});

function shortTemp(temp){
    sortedTempList.push(temp);
    sortedTempList.sort((a, b) => {
        return a - b;
    })
    console.log(sortedTempList)
}