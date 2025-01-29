//? How to Run This Program?
/*
 TODO: 1️⃣ Install dependencies: Run `npm install`
 TODO: 2️⃣ Start the program: Run `npm run dev`
 * 
 * This script fetches a random joke from an API and displays it with colored output using `chalk`.
 * It uses the `https` module to make an HTTP request to the joke API.
 */

//? What does this program do?
/*
 * This is a simple CLI-based **Random Joke Generator**.
 * It fetches a joke from an online API and prints it to the console.
 * The application uses:
 * - `https` module to make API requests.
 * - `chalk` module to format console output with colors.
 */

//? Importing required modules
import https from "https"; // @ Importing HTTPS module to make API requests
import chalk from "chalk"; // @ Importing Chalk module for colored console output

//? Function to fetch and display a joke
function getJoke() {
    const url = "https://official-joke-api.appspot.com/random_joke"; // @ API URL for random jokes

    https.get(url, (res) => { // @ Sending a GET request to the joke API
        let data = ""; // @ Variable to store API response data

        res.on("data", (chunk) => { 
            data += chunk; // @ Collecting data chunks
        });

        res.on("end", () => { 
            try {
                const joke = JSON.parse(data); // @ Parsing JSON response
                console.log(chalk.green.bold.underline(`🤣 Here is your ${joke.type} joke:`)); // @ Display joke type
                console.log(chalk.blueBright(joke.setup)); // @ Display joke setup
                console.log(chalk.yellow.bold(joke.punchline)); // @ Display joke punchline
            } catch (err) {
                console.log(chalk.redBright.bold("❌ Error parsing joke data!")); // @ Handle JSON parsing error
            }
        });

        res.on("error", (err) => {
            console.log(chalk.redBright.bold(`❌ Error fetching joke: ${err.message}`)); // @ Handle request error
        });
    });
}

//? Start the program by fetching a joke
getJoke();
