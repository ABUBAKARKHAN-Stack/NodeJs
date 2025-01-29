//? 📌 How to Run This Program?
/*
 TODO: 1️⃣ Install dependencies: Run `npm install`
 TODO: 2️⃣ Start the program: Run `npm run dev`
 *
 * This script fetches the current weather for a given city using OpenWeatherMap API.
 * It displays temperature, humidity, wind speed, and a short description.
 */

//? 🛠 Importing required modules
import readline from "readline/promises"; // @ Readline for user input (modern async)
import chalk from "chalk"; // @ Chalk for colorful console output
import dotenv from "dotenv"; // @ Dotenv for environment variables

dotenv.config(); //? 🔐 Load environment variables from .env file

//? 🔑 API Credentials
const API_KEY = process.env.WEATHER_API_KEY || "you-api-key"; // @ Store API key securely
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"; // @ API base URL

//? 📌 Creating readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//? 🌦️ Function to fetch weather data
async function getWeather(city) {
    if (!city) {
        console.log(chalk.red("❌ Please provide a valid city name.")); // @ Validate user input
        return;
    }

    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}`; // @ Construct API URL

    try {
        const res = await fetch(url); // @ Fetch data from API
        const data = await res.json(); // @ Parse JSON response

        //? ✅ Check for errors in API response
        if (data.cod !== 200) {
            console.log(chalk.red(`❌ Error: ${data.message}`)); // @ Show API error message
            return;
        }

        //? 📝 Extract useful information
        const info = {
            city: data.name,
            tempInC: data.main.temp - 273.15, // @ Convert Kelvin to Celsius
            desc: data.weather[0].description,
            humidity: data.main.humidity,
            wind: data.wind.speed,
        };

        //? 📢 Display weather details
        console.log(chalk.green.bold.underline(`\n📍 Weather Information for ${info.city}`));
        console.log(chalk.blueBright(`🌡️ Temperature: ${info.tempInC.toFixed(2)}°C`));
        console.log(chalk.blueBright(`💧 Humidity: ${info.humidity}%`));
        console.log(chalk.blueBright(`🌦️ Description: ${info.desc}`));
        console.log(chalk.blueBright(`🌬️ Wind Speed: ${info.wind} m/s`));

    } catch (error) {
        console.log(chalk.red("❌ Error fetching data. Please check your internet connection.")); // @ Handle network errors
    }
}

//? 🎯 Get city name from user input
const city = await rl.question(chalk.yellow("🏙️ Enter City Name To Get Weather: "));
await getWeather(city.trim().toLowerCase()); // @ Trim input for safety
rl.close(); // @ Close readline after use
