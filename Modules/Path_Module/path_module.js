// ? What is the Path Module?
/**
 * A Path module is a Node.js module that provides utilities for working with file and directory paths.
 * It allows you to manipulate file paths in a platform-independent way.
 */

const path = require('path'); // @ Import the path module from Node.js.

console.log(__dirname); // @ Prints the current directory path.
console.log(__filename); // @ Prints the current file path.

//! Note: We cannot use __dirname and __filename in ES6 modules.
//! These are specific to Node.js CommonJS modules and are not part of the ECMAScript standard.
//? How to use in ES6 modules:
//* You can achieve similar functionality in ES6 modules by using import.meta.url.

// ? path.join() METHOD
/**
 * The path.join() method joins multiple path segments into a single path string.
 * It automatically handles platform-specific path separators ('/' on Unix, '\' on Windows).
 * Ensures the resulting path is correctly formatted.
 * 
 * Example: In a hospital management system, we store data in a file named `hospitalPatients.txt`.
 */
const filePath = path.join(__dirname, 'hospitalPatients.txt'); // @ Joins current directory with the file name.
console.log(filePath); // ! Prints the path to the `hospitalPatients.txt` file.

// ? path.parse() METHOD
/**
 * The path.parse() method parses a file path into its constituent parts, 
 * such as the directory, file name, and file extension.
 */
const parsedPath = path.parse(filePath); // @ Parses the file path.
console.log(parsedPath); // ! Prints the parsed path object.

// ? path.basename() METHOD
/**
 * The path.basename() method extracts the file name from a file path.
 * It returns the last portion of the path (e.g., the file name).
 */
const fileName = path.basename(filePath); // @ Extracts the file name.
console.log(fileName); // ! Prints the file name (`hospitalPatients.txt`).

// ? path.dirname() METHOD
/**
 * The path.dirname() method extracts the directory path from a file path.
 * It returns the directory portion of the path, excluding the file name.
 */
const directoryPath = path.dirname(filePath); // @ Extracts the directory path.
console.log(directoryPath); // ! Prints the directory path.

// ? path.extname() METHOD
/**
 * The path.extname() method extracts the file extension from a file path.
 * It returns the file extension, including the leading dot (.).
 */
const fileExtension = path.extname(filePath); // @ Extracts the file extension.
console.log(fileExtension); // ! Prints the file extension (`.txt`).

// ? path.resolve() METHOD
/**
 * The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
 * It takes one or more path segments as arguments and returns the absolute path.
 */
const absolutePath = path.resolve(filePath); // @ Resolves the absolute path of the file.
console.log(absolutePath); // ! Prints the absolute path to `hospitalPatients.txt`.

//! Additional Information:
// There are many more methods in the Path module.
// TODO: Refer to the official documentation for more details.
// TODO: Documentation: https://nodejs.org/api/path.html
