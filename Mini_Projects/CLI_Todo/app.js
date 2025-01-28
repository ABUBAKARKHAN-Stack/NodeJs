//? What does this program do?
/*
 * This program is a simple CLI-based Todo List application.
 * It allows the user to add tasks, view all tasks, and exit the application.
 * The application uses `chalk` for colored output and `readline` for user input.
 */

import chalk from "chalk"; // @ Import chalk for colored console output
import readline from "readline"; // @ Import readline to interact with the user via the CLI

//? Create a readline interface
const rl = readline.createInterface({
    input: process.stdin, // @ Specify input source as standard input (keyboard)
    output: process.stdout, // @ Specify output source as standard output (console)
});

//* Array to store tasks
const todos = [];

console.log(
    chalk.green.bold.italic.underline(
        "\nWelcome to the Todo List Application!" // @ Display welcome message in green
    )
);

//? Function to display the main menu
function showMenu() {

    console.log(
        chalk.blue(
            "\n1. Add Task\n2. View Tasks\n3. Exit\n" // @ Display menu options in blue
        )
    );
    rl.question("Choose an option: ", handleInput); // @ Prompt user for menu selection
}

//? Function to handle user input from the menu
function handleInput(option) {
    switch (option) {
        case "1": // @ Option 1: Add a new task
            rl.question("Enter Task: ", addTask); // @ Prompt user for the task description
            break;
        case "2": // @ Option 2: View all tasks
            displayAllTasks();
            showMenu(); // @ Return to the menu after displaying tasks
            break;
        case "3": // @ Option 3: Exit the application
            console.log(chalk.bold("Goodbye!")); // @ Display farewell message
            rl.close(); // @ Close the readline interface
            break;
        default: // @ Handle invalid input
            console.log(chalk.bold.red("Invalid option. Please try again.")); // @ Display error message
            showMenu(); // @ Show the menu again
            break;
    }
}

//? Function to add a task
function addTask(task) {
    todos.push(task); // @ Add the task to the `todos` array
    console.log(
        chalk.greenBright(
            `Task Added: ${task.charAt(0).toUpperCase() + task.slice(1)}` // @ Capitalize the first letter of the task
        )
    );
    showMenu(); // @ Return to the menu
}

//? Function to display all tasks
function displayAllTasks() {
    console.log(chalk.bold.green("\nYour Todo List:")); // @ Display title for the task list
    if (todos.length === 0) {
        // @ Check if the list is empty
        console.log(chalk.red("No tasks found.")); // @ Inform user if no tasks exist
    } else {
        todos.forEach((todo, index) => {
            // @ Loop through each task in the `todos` array
            console.log(chalk.bold.yellow(`${index + 1}. ${todo}`)); // @ Display task with index
        });
    }
}

//? Start the application
showMenu(); // @ Show the menu when the application starts
