// ? What is fs module?
/**
 * The `fs` module is a built-in module in Node.js that provides a way to interact with the file system.
 * It allows you to perform various operations such as reading from and writing to files,
 * creating and deleting files and directories, and more.
 */

const fs = require('fs'); // @ Importing the `fs` module.
const path = require('path'); // @ Importing the `path` module for handling and transforming file paths.

// @ File path for operations
const filePath = path.join(__dirname, "test.txt"); // @ Creating a path to the file.

/*
! Types of File Operations in Node.js:
? 1. Synchronous (Sync):
 * - Blocking operations that execute one after another.
 * - The next operation starts only after the previous one finishes.

? 2. Asynchronous (Async):
 * - Non-blocking operations that execute independently.
 * - Uses callbacks, promises, or async/await to handle results.
 */

/*
 * CRUD = Create, Read, Update, Delete
 */

/* --------------------------------------------------------------------------
 * ASYNCHRONOUS CRUD OPERATIONS (USING CALLBACKS)
 * -------------------------------------------------------------------------- */

// ? fs.writeFile() Method
// fs.writeFile(filePath, "THIS IS DUMMY", "utf-8", (err) => {
//     if (err) console.log("Failed To Generate File");
//     else console.log("File Successfully Created");
// });

// ? fs.readFile() Method
// fs.readFile(filePath, "utf-8", (err, data) => {
//     err ? console.log("Error While Reading File") : console.log(data);
// });

// ? fs.appendFile() Method
// fs.appendFile(filePath, "\nTHIS Is Dummy Data Updated :)", "utf-8", (err) => {
//     err ? console.log("Error While Updating File") : console.log("File Successfully Updated");
// });

// ? fs.unlink() Method
// fs.unlink(filePath, (err) => {
//     err ? console.log("Error While Deleting File") : console.log("File Successfully Deleted");
// });

/* --------------------------------------------------------------------------
 * DIRECTORY OPERATIONS (USING SYNC METHODS)
 * -------------------------------------------------------------------------- */

// ? fs.mkdirSync() Method
// const dirPath = path.join(__dirname, "exampleDir");
// if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//     console.log("Directory Created Successfully");
// } else {
//     console.log("Directory Already Exists");
// }

// ? fs.rmdirSync() Method
// if (fs.existsSync(dirPath)) {
//     fs.rmdirSync(dirPath);
//     console.log("Directory Deleted Successfully");
// } else {
//     console.log("Directory Does Not Exist");
// }

/* --------------------------------------------------------------------------
 * CRUD OPERATIONS USING PROMISES
 * -------------------------------------------------------------------------- */

// ? Create File
// fs.promises.writeFile(filePath, "THIS IS DUMMY", "utf-8")
//     .then(() => console.log("File Created Successfully"))
//     .catch((err) => console.log("Error While Creating File :: ", err));

// ? Read File
// fs.promises.readFile(filePath, "utf-8")
//     .then((data) => console.log(data))
//     .catch((err) => console.log("Error While Reading File :: ", err));

// ? Update File
// fs.promises.appendFile(filePath, "Updated Data", "utf-8")
//     .then(() => console.log("File Updated Successfully"))
//     .catch((err) => console.log("Error While Updating File :: ", err));

// ? Delete File
// fs.promises.unlink(filePath)
//     .then(() => console.log("File Deleted Successfully"))
//     .catch((err) => console.log("Error While Deleting File :: ", err));

/* --------------------------------------------------------------------------
 * CRUD OPERATIONS USING ASYNC/AWAIT
 * -------------------------------------------------------------------------- */

// ? Create File
// const createFile = async () => {
//     try {
//         await fs.promises.writeFile(filePath, "THIS IS DUMMY", "utf-8");
//         console.log("File Created Successfully");
//     } catch (error) {
//         console.log("Error While Creating File :: ", error);
//     }
// };
// createFile();

// ? Read File
// const readFile = async () => {
//     try {
//         const data = await fs.promises.readFile(filePath, "utf-8");
//         console.log(data);
//     } catch (error) {
//         console.log("Error While Reading File :: ", error);
//     }
// };
// readFile();

// ? Update File
// const updateFile = async () => {
//     try {
//         await fs.promises.appendFile(filePath, "Updated Data", "utf-8");
//         console.log("File Updated Successfully");
//     } catch (error) {
//         console.log("Error While Updating File :: ", error);
//     }
// };
// updateFile();

// ? Delete File
// const deleteFile = async () => {
//     try {
//         await fs.promises.unlink(filePath);
//         console.log("File Deleted Successfully");
//     } catch (error) {
//         console.log("Error While Deleting File :: ", error);
//     }
// };
// deleteFile();

/* --------------------------------------------------------------------------
 * SUMMARY
 * --------------------------------------------------------------------------
 * - This code demonstrates CRUD operations on files and directories.
 * - Methods are shown using callbacks, promises, and async/await.
 * - Directory creation and deletion are demonstrated using `fs.mkdirSync` and `fs.rmdirSync`.
 * 
 * Note:
 * - Uncomment one operation at a time to observe its behavior.
 * - Make sure to handle dependencies such as file existence to avoid errors during execution.
 * 
 * Resources:
 * - Node.js FS Module Docs: https://nodejs.org/api/fs.html
 */
