document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherData);
    } else {
        document.getElementById('weather-info').innerHTML = 'Geolocation is not supported by this browser.';
    }
}

function fetchWeatherData(position) {
    const { latitude, longitude } = position.coords;
    const apiKey = '6ec2c4dc2af55b596da69cd5edd99106';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const city = data.name;
            const temperature = Math.round(data.main.temp - 273.15); 
            const description = data.weather[0].description;

            document.getElementById('city-output').textContent = city;
            document.getElementById('weather-output').textContent = description;
            document.getElementById('temp-output').textContent = temperature;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = 'Error fetching weather data. Please try again later.';
        });
}
