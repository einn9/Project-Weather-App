import "./style.css";

const city = document.querySelector("#city");
const temperature = document.querySelector("#temperature");
const conditions = document.querySelector("#conditions");
const humidity = document.querySelector("#humidity");


const form = document.querySelector("#signup-form");

let button;

async function getWeather(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`);

    if (!response.ok) {
    throw new Error("Weather data could not be retrieved");
    }
    const weatherData = await response.json();

    console.log("WEATHER DATA", weatherData)
    return weatherData;
}

function processWeather(weatherData) {
    return {
        city: weatherData.resolvedAddress,
        temperature: weatherData.currentConditions.temp,
        conditions: weatherData.currentConditions.conditions,
        humidity: weatherData.currentConditions.humidity
    };
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendData();
});

async function sendData() {
    let inputLocation = document.querySelector("#locationInput");

    try {
        const weatherData = await getWeather(inputLocation.value);

        const processedData = processWeather(weatherData);

        form.reset();

        console.log("WEATHER DATA", weatherData);

        city.textContent = "Location: " + processedData.city;
        temperature.textContent = "Temperature: " + processedData.temperature + "°F";

        if (button) {
            button.remove();
        }

        button = document.createElement("button");
        button.textContent = "Change to Celsius";

        const temperatureToCelsius = ((processedData.temperature - 32) * 5 / 9).toFixed(1);

        document.body.appendChild(button);

        button.addEventListener("click", () => {
            if (button.textContent === "Change to Celsius") {
                button.textContent = "Change to Fahrenheit";
                temperature.textContent = "Temperature: " + temperatureToCelsius + "°C";
            } else {
                button.textContent = "Change to Celsius";
                temperature.textContent = "Temperature: " + processedData.temperature + "°F";
            }
        });

            conditions.textContent = "Conditions: " + processedData.conditions;
            humidity.textContent = "Humidity: " + processedData.humidity + "%";

    } catch (e) {
        console.log("error");
        console.error(e);
        alert("Please write a valid City or Country");
    }
}