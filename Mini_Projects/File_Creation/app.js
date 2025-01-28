//? What does this program do?
/*
 * This program is a simple CLI-based file creator.
 * It allows the user to input a filename, file content, and an optional extension.
 * If the file already exists, the user can choose to overwrite it.
 * The application uses:
 * - `fs` (File System) module to handle file operations.
 * - `readline` module to take user input from the command line.
 * - `path` module to handle file paths.
 */

const fs = require("fs"); // @ Importing File System module to read and write files.
const readline = require("readline"); // @ Importing Readline module to interact with users in CLI.
const path = require("path"); // @ Importing Path module to manage file paths.

//? Creating an interface to read input from the user
const rl = readline.createInterface({
    input: process.stdin, // @ Standard input (keyboard).
    output: process.stdout, // @ Standard output (console).
});

//? Function to start the user input process
function show() {
    rl.question("📄 Enter the file name: ", (name) => { // @ Asking the user to input a file name.
        if (!name.trim()) { // @ Check if the input is empty or only spaces.
            console.log("⚠️ Please enter a valid file name!"); // @ Warning for empty input.
            return show(); // @ Restart the input process.
        }

        rl.question("✍️ Enter the file content: ", (content) => { // @ Asking the user to input file content.
            if (!content.trim()) { // @ Check if the content is empty.
                console.log("⚠️ File content cannot be empty!"); // @ Warning for empty content.
                return show(); // @ Restart the input process.
            }

            rl.question("🔧 Enter the file extension (default: .txt): ", (ext) => { // @ Asking for the file extension.
                createFile(name.trim(), content, ext.trim() || "txt"); // @ Call function with user inputs.
            });
        });
    });
}

//? Function to create or overwrite a file
function createFile(name, content, ext) {
    const filePath = path.join(__dirname, `${name}.${ext}`); // @ Creating the full file path.

    if (fs.existsSync(filePath)) { // @ Check if the file already exists.
        rl.question(
            "⚠️ File already exists. Do you want to overwrite it? (y/n): ", // @ Ask user if they want to overwrite.
            (ans) => {
                handleOverwrite(ans, filePath, content); // @ Call function to handle user choice.
            }
        );
    } else {
        writeFile(filePath, content, false); // @ If file does not exist, create a new one.
    }
}

//? Function to handle file overwriting confirmation
function handleOverwrite(ans, filePath, content) {
    if (ans.toLowerCase() === "y") { // @ If the user chooses 'y', overwrite the file.
        writeFile(filePath, content, true);
    } else if (ans.toLowerCase() === "n") { // @ If the user chooses 'n', cancel the operation.
        console.log("❌ Operation canceled!");
        rl.close(); // @ Close the readline interface.
    } else { // @ If the input is invalid, ask again.
        console.log("⚠️ Invalid input! Please enter 'y' or 'n'.");
        rl.question("Do you want to overwrite it? (y/n): ", (ans) => {
            handleOverwrite(ans, filePath, content);
        });
    }
}

//? Function to write content to a file
function writeFile(filePath, content, isOverwrite) {
    fs.writeFile(filePath, content, (err) => { // @ Writing content to the file.
        if (err) { // @ Check for errors.
            console.log(`❌ Error creating file: ${err.message}`); // @ Display error message.
            rl.close(); // @ Close readline interface.
            return;
        }

        console.log(
            isOverwrite
                ? "✅ File overwritten successfully!" // @ Success message for overwriting.
                : "✅ File created successfully!" // @ Success message for new file creation.
        );
        rl.close(); // @ Close the readline interface after the process is complete.
    });
}

//? Start the application by showing input prompts
show();
