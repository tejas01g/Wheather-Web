const apiKey = '82fe8a1956d3e94ee27854b271b923ac';
const weatherDetails = document.getElementById('weather-details');
const errorMessage = document.getElementById('error-message');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

async function getWeatherData(city) {
    try {
        weatherDetails.style.opacity = '0';
        errorMessage.style.opacity = '0';
        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        await displayWeatherData(data);
        
        weatherDetails.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        
        setTimeout(() => {
            weatherDetails.style.opacity = '1';
            weatherDetails.style.transform = 'scale(1)';
        }, 100);
    } catch (error) {
        weatherDetails.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        
        setTimeout(() => {
            errorMessage.style.opacity = '1';
            errorMessage.style.transform = 'scale(1)';
        }, 100);
    }
}

function displayWeatherData(data) {
    document.querySelector('#city-name span').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = iconUrl;
    weatherIcon.alt = data.weather[0].description;
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// Add loading animation
cityInput.addEventListener('input', () => {
    if (cityInput.value.trim() !== '') {
        searchBtn.classList.add('active');
    } else {
        searchBtn.classList.remove('active');
    }
}); 