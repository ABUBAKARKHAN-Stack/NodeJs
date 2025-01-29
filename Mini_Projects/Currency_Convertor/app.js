//? Importing required modules
import chalk from "chalk"; // @ Importing Chalk module for colored console output
import readline from "readline"; // @ Importing Readline module for user input
import https from "https"; // @ Importing HTTPS module to make API requests

//? Creating readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,  // @ Accept input from the terminal
    output: process.stdout, // @ Display output in the terminal
});

//? Function to generate the API URL based on base currency
function generateUrl(base) {
    return `https://api.fxratesapi.com/latest?base=${base}`; // @ API URL with dynamic base currency
}

//? Function to prompt user for base currency input
function getBaseCurrency() {
    rl.question(chalk.green("Enter the base currency (default: USD): "), (base) => {
        base = base || "USD"; // @ Default to USD if the user doesn't enter anything
        getCurrency(base); // @ Fetch currency exchange rates
    });
}

//? Function to fetch currency rates for the given base currency
function getCurrency(base) {
    const url = generateUrl(base); // @ Generate the API URL
    https.get(url, (res) => { // @ Sending a GET request to the API
        let data = ""; // @ Variable to store API response data
        
        res.on("data", (chunk) => (data += chunk)); // @ Collecting data chunks

        res.on("end", () => {
            const jsonData = JSON.parse(data); // @ Parse JSON response
            console.log(chalk.green.bold.underline(`Conversion Rates for ${base.toUpperCase()}`)); // @ Display base currency
            console.log(jsonData.rates); // @ Log all exchange rates for the base currency
            selectFromToCurrency(jsonData.rates, base); // @ Proceed to currency selection
        });
    });
}

//? Function to fetch the exchange rate for the 'from' currency
function fromCurrency(from, rates) {
    return new Promise((resolve, reject) => {
        const rate = rates[from.toUpperCase()]; // @ Get rate for the given currency
        if (rate) {
            resolve(rate); // @ Return the rate if found
        } else {
            reject(`Currency ${from.toUpperCase()} not found`); // @ Handle invalid currency
        }
    });
}

//? Function to fetch the exchange rate for the 'to' currency
function toCurrency(to, rates) {
    return new Promise((resolve, reject) => {
        const rate = rates[to.toUpperCase()]; // @ Get rate for the given currency
        if (rate) {
            resolve(rate); // @ Return the rate if found
        } else {
            reject(`Currency ${to.toUpperCase()} not found`); // @ Handle invalid currency
        }
    });
}

//? Function to perform currency conversion
async function convertCurrency(from, to, amount, rates) {
    try {
        // @ Fetch exchange rates for both currencies
        const fromRate = await fromCurrency(from, rates);
        const toRate = await toCurrency(to, rates);

        // @ Calculate the converted amount
        const result = (amount / fromRate) * toRate;

        // @ Display the conversion result
        console.log(
            chalk.green.bold.underline(
                `\nConversion Rate from ${from.toUpperCase()} to ${to.toUpperCase()} for ${amount} is ${result.toFixed(2)}`
            )
        );
    } catch (error) {
        console.log(chalk.red(`Error: ${error}`)); // @ Handle errors gracefully
    } finally {
        rl.close(); // @ Close readline interface after conversion
    }
}

//? Function to ask user for 'from' currency, 'to' currency, and amount
function selectFromToCurrency(rates, base) {
    rl.question(chalk.green("Enter the currency to convert from (default: USD): "), (from = base) => {
        rl.question(chalk.green("Enter the currency to convert to: "), (to) => {
            if (!to) {
                console.log(chalk.red("Please enter a valid currency")); // @ Validate currency input
                return selectFromToCurrency(rates, base); // @ Restart currency selection
            }
            rl.question(chalk.green("Enter the amount to convert: "), (amount) => {
                amount = parseFloat(amount); // @ Convert input to a float number
                if (isNaN(amount) || amount <= 0) {
                    console.log(chalk.red("Please enter a valid amount")); // @ Validate amount input
                    return selectFromToCurrency(rates, base); // @ Restart input
                }
                convertCurrency(from || base, to, amount, rates); // @ Perform currency conversion
            });
        });
    });
}

//? Start the program by asking for base currency
getBaseCurrency();
