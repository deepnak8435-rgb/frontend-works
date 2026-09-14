// GET HTML ELEMENTS
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherResult = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
// WEATHER CODE → DESCRIPTION
function getWeatherDescription(weatherCode) {
  if (weatherCode === 0) {
    return "Clear sky";
  }
  if (weatherCode === 1 || weatherCode === 2) {
    return "Partly cloudy";
  }
  if (weatherCode === 3) {
    return "Overcast";
  }
  if (weatherCode === 45 || weatherCode === 48) {
    return "Foggy";
  }
  if (weatherCode >= 51 && weatherCode <= 57) {
    return "Drizzle";
  }
  if (weatherCode >= 61 && weatherCode <= 67) {
    return "Rain";
  }
  if (weatherCode >= 71 && weatherCode <= 77) {
    return "Snow";
  }
  if (weatherCode >= 80 && weatherCode <= 82) {
    return "Rain showers";
  }
  if (weatherCode >= 85 && weatherCode <= 86) {
    return "Snow showers";
  }
  if (weatherCode === 95) {
    return "Thunderstorm";
  }
  if (weatherCode === 96 || weatherCode === 99) {
    return "Thunderstorm with hail";
  }
  return "Unknown weather";
}
// WEATHER CODE → ICON
function getWeatherIcon(weatherCode) {
  if (weatherCode === 0) {
    return "☀️";
  }
  if (weatherCode === 1 || weatherCode === 2) {
    return "🌤️";
  }
  if (weatherCode === 3) {
    return "☁️";
  }
  if (weatherCode === 45 || weatherCode === 48) {
    return "🌫️";
  }
  if (weatherCode >= 51 && weatherCode <= 57) {
    return "🌦️";
  }
  if (weatherCode >= 61 && weatherCode <= 67) {
    return "🌧️";
  }
  if (weatherCode >= 71 && weatherCode <= 77) {
    return "❄️";
  }
  if (weatherCode >= 80 && weatherCode <= 82) {
    return "🌦️";
  }
  if (weatherCode >= 85 && weatherCode <= 86) {
    return "🌨️";
  }
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    return "⛈️";
  }
  return "🌤️";
}
// DISPLAY WEATHER
function displayWeather(data, locationName) {
  const current = data.current;
  // City name
  cityName.textContent = locationName;
  // Temperature
  temperature.textContent = `${Math.round(current.temperature_2m)}°C`;
  // Weather condition
  condition.textContent = getWeatherDescription(current.weather_code);
  // Humidity
  humidity.textContent = `💧 Humidity: ${current.relative_humidity_2m}%`;
  // Wind
  wind.textContent = `💨 Wind: ${current.wind_speed_10m} km/h`;
  // Weather icon
  weatherIcon.textContent = getWeatherIcon(current.weather_code);
  // Show weather result
  weatherResult.style.display = "block";
}
// GET WEATHER BY COORDINATEs
async function getWeatherByCoordinates(latitude, longitude, locationName) {
  loading.textContent = "Loading weather...";
  error.textContent = "";
  weatherResult.style.display = "none";
  // Weather API URL
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh`;
  try {
    // Send request
    const response = await fetch(url);
    // Check response
    if (!response.ok) {
      throw new Error("Unable to fetch weather data.");
    }
    // Convert response to JSON
    const data = await response.json();
    console.log("Weather data:", data);
    // Display weather
    displayWeather(data, locationName);
  } catch (err) {
    console.error("Weather error:", err);
    error.textContent = "Unable to get weather data. Please try again.";
  } finally {
    loading.textContent = "";
  }}
// SEARCH WEATHER BY CITY
async function getWeather(city) {
  loading.textContent = "Searching for city...";
  error.textContent = "";
  weatherResult.style.display = "none";
  // encodeURIComponent handles spaces
  // and special characters in city names

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  try {
    // Request city information
    const response = await fetch(url);
    // Check response
    if (!response.ok) {
      throw new Error("Unable to search for city.");
    }
    // Convert response to JSON
    const data = await response.json();
    console.log("City search data:", data);
    // Check whether city exists
    if (!data.results || data.results.length === 0) {
      throw new Error("City not found");
    }
    // Get first result
    const location = data.results[0];
    // Get latitude
    const latitude = location.latitude;
    // Get longitude
    const longitude = location.longitude;
    // Create display name
    const locationName = `${location.name}, ${location.country}`;
    // Get weather
    await getWeatherByCoordinates(latitude, longitude, locationName);
  } catch (err) {
    console.error("Search error:", err);
    if (err.message === "City not found") {
      error.textContent = "City not found. Please enter a valid city.";
    } else {
      error.textContent = "Unable to search for the city.";
    }
    loading.textContent = "";
  }
}
// SEARCH BUTTON EVENT
searchBtn.addEventListener("click", () => {
  // Get input value
  const city = cityInput.value.trim();
  // Validate input
  if (city === "") {
    error.textContent = "Please enter a city name.";
    weatherResult.style.display = "none";
    return;
  }
  // Call weather function
  getWeather(city);
});
// ENTER KEY EVENT
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
// CURRENT LOCATION
locationBtn.addEventListener("click", () => {
  // Clear old messages
  error.textContent = "";
  weatherResult.style.display = "none";
  // Check geolocation support
  if (!navigator.geolocation) {
    error.textContent = "Geolocation is not supported by your browser.";
    return;
  }
  // Show loading
  loading.textContent = "Getting your location...";
  // Get current position
  navigator.geolocation.getCurrentPosition(
    // SUCCESS
    async (position) => {
      // Get latitude
      const latitude = position.coords.latitude;
      // Get longitude
      const longitude = position.coords.longitude;
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      // Get weather using coordinates
      await getWeatherByCoordinates( latitude, longitude, "Your Current Location",);
    },
    // ERROR
    (errorObject) => {
      loading.textContent = "";
      console.error("Geolocation error:", errorObject);
      if (errorObject.code === errorObject.PERMISSION_DENIED) {
        error.textContent =
          "Location permission was denied. Please allow location access.";
      } else if (errorObject.code === errorObject.POSITION_UNAVAILABLE) {
        error.textContent = "Your location could not be determined.";
      } else if (errorObject.code === errorObject.TIMEOUT) {
        error.textContent = "Location request timed out. Please try again.";
      } else {
        error.textContent = "Unable to access your location.";
      } }, );
});
