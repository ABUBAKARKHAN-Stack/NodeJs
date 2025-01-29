//? 📌 How to Run This Program?
/*
 TODO: 1️⃣ Install dependencies: Run `npm install`
 TODO: 2️⃣ Start the program: Run `npm run dev`
 *
 * This script allows users to convert one currency to another using real-time exchange rates.
 * It fetches currency exchange rates from an API and calculates the converted amount.
 */

//? 🛠 Importing required modules
import chalk from "chalk"; // @ Importing Chalk module for colored console output
import readline from "readline"; // @ Importing Readline module for user input
import https from "https"; // @ Importing HTTPS module to make API requests

//? 🖥️ Creating readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,  // @ Accept input from the terminal
    output: process.stdout, // @ Display output in the terminal
});

//? 🔗 Function to generate the API URL based on base currency
function generateUrl(base) {
    return `https://api.fxratesapi.com/latest?base=${base}`; // @ API URL with dynamic base currency
}

//? 🌍 Function to prompt user for base currency input
function getBaseCurrency() {
    rl.question(chalk.green("💰 Enter the base currency (default: USD): "), (base) => {
        base = base.trim() || "USD"; // @ Default to USD if user input is empty
        getCurrency(base.toUpperCase()); // @ Fetch currency exchange rates
    });
}

//? 🔄 Function to fetch currency rates for the given base currency
function getCurrency(base) {
    const url = generateUrl(base); // @ Generate the API URL
    https.get(url, (res) => { // @ Sending a GET request to the API
        let data = ""; // @ Variable to store API response data

        res.on("data", (chunk) => (data += chunk)); // @ Collecting data chunks

        res.on("end", () => {
            try {
                const jsonData = JSON.parse(data); // @ Parse JSON response
                
                //? ✅ Check if the API response contains valid data
                if (!jsonData.rates) {
                    console.log(chalk.red("❌ Error: Invalid API response!"));
                    rl.close();
                    return;
                }

                console.log(chalk.green.bold.underline(`💱 Conversion Rates for ${base}`)); // @ Display base currency
                console.log(jsonData.rates); // @ Log all exchange rates for the base currency
                
                //? Move to next step: Ask user for conversion details
                selectFromToCurrency(jsonData.rates, base);
            } catch (error) {
                console.log(chalk.red("❌ Error parsing API response!"));
                rl.close();
            }
        });
    }).on("error", (err) => {
        console.log(chalk.red(`❌ Error fetching data: ${err.message}`)); // @ Handle API request errors
        rl.close();
    });
}

//? 📌 Function to fetch the exchange rate for the 'from' currency
function fromCurrency(from, rates) {
    return new Promise((resolve, reject) => {
        const rate = rates[from.toUpperCase()]; // @ Get rate for the given currency
        rate ? resolve(rate) : reject(`⚠️ Currency ${from.toUpperCase()} not found`); // @ Handle invalid currency
    });
}

//? 📌 Function to fetch the exchange rate for the 'to' currency
function toCurrency(to, rates) {
    return new Promise((resolve, reject) => {
        const rate = rates[to.toUpperCase()]; // @ Get rate for the given currency
        rate ? resolve(rate) : reject(`⚠️ Currency ${to.toUpperCase()} not found`); // @ Handle invalid currency
    });
}

//? 🔄 Function to perform currency conversion
async function convertCurrency(from, to, amount, rates) {
    try {
        // @ Fetch exchange rates for both currencies
        const fromRate = await fromCurrency(from, rates);
        const toRate = await toCurrency(to, rates);

        // @ Calculate the converted amount
        const result = (amount / fromRate) * toRate;

        //? ✅ Display the conversion result
        console.log(
            chalk.green.bold.underline(
                `\n✅ Conversion from ${from.toUpperCase()} to ${to.toUpperCase()}`
            )
        );
        console.log(
            chalk.blueBright(
                `💰 ${amount} ${from.toUpperCase()} = ${result.toFixed(2)} ${to.toUpperCase()}`
            )
        );
    } catch (error) {
        console.log(chalk.red(`❌ Error: ${error}`)); // @ Handle errors gracefully
    } finally {
        rl.close(); // @ Close readline interface after conversion
    }
}

//? 🔄 Function to ask user for 'from' currency, 'to' currency, and amount
function selectFromToCurrency(rates, base) {
    rl.question(chalk.green("💱 Enter the currency to convert from (default: USD): "), (from = base) => {
        from = from.trim() || base; // @ Default to base currency if input is empty

        rl.question(chalk.green("🔄 Enter the currency to convert to: "), (to) => {
            to = to.trim(); // @ Trim input to remove spaces

            if (!to) {
                console.log(chalk.red("⚠️ Please enter a valid currency")); // @ Validate currency input
                return selectFromToCurrency(rates, base); // @ Restart currency selection
            }

            rl.question(chalk.green("💰 Enter the amount to convert: "), (amount) => {
                amount = parseFloat(amount.trim()); // @ Convert input to a float number

                if (isNaN(amount) || amount <= 0) {
                    console.log(chalk.red("⚠️ Please enter a valid amount")); // @ Validate amount input
                    return selectFromToCurrency(rates, base); // @ Restart input
                }

                //? ✅ Proceed to currency conversion
                convertCurrency(from, to, amount, rates);
            });
        });
    });
}

//? 🎯 Start the program by asking for base currency
getBaseCurrency();
