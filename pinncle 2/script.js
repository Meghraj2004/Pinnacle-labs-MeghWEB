async function fetchWeather() {
    const city = document.getElementById("city-input").value;
    const apiKey = 'b1d7b6d26ba497cf391b95b7c3b32b43';  // Replace with your API key
    const weatherInfo = document.getElementById("weather-info");
    
    if (!city) {
        showError("Please enter a city name!");
        return;
    }
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        
        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById("conditions").innerText = capitalizeFirstLetter(data.weather[0].description);
        document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("wind").innerText = `${data.wind.speed} m/s`;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather-icon").alt = data.weather[0].description;

        weatherInfo.classList.remove("hidden");
        setTimeout(() => {
            weatherInfo.classList.add("visible");
        }, 10);
    } catch (error) {
        showError("Failed to fetch weather data. Please try again.");
        console.error(error);
    }
}

function showError(message) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.classList.add("hidden");
    weatherInfo.classList.remove("visible");
    alert(message);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById("city-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        fetchWeather();
    }
});

document.querySelector("button").addEventListener("click", fetchWeather);