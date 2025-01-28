//? What is a module?
/*
 * A module is a self-contained piece of code that provides functions and methods that can be used in other files or by other modules.
 * Using the `http` module, we can create a server, handle requests and responses, or even create REST APIs.
 */

// @ Importing the `http` module
const http = require("http");

//? Let's Create a Server
/*
 * The server listens for incoming HTTP requests and responds based on the URL path provided.
 */
const server = http.createServer((req, res) => {
    if (req.url === "/") { // @ Check if the request is for the root path
        res.setHeader("Content-Type", "text/html"); // @ Set the response header to indicate HTML content
        res.write("<h1>Home Page</h1>"); // @ Write the response body for the Home page
        res.end(); // @ End the response
    }
    else if (req.url === "/about") { // @ Check if the request is for the About page
        res.setHeader("Content-Type", "text/html"); // @ Set the response header to indicate HTML content
        res.write("<h1>About Page</h1>"); // @ Write the response body for the About page
        res.end(); // @ End the response
    }
});

//* Now, We Need a PORT Number to Run the Server
/*
 * The `.listen` method is used to make the server start listening on a specific port.
 */
const PORT = 3000; // @ Define the port number for the server

server.listen(PORT, () => { // @ Start the server and listen on the specified port
    console.log(`Server is running on port ${PORT}`); // @ Log a message indicating the server is running
});

/*
! Did You Know?
 * An alternative framework for Node.js called Express.js makes creating servers and APIs even easier.
 * Express.js offers a more streamlined and powerful API for routing and middleware.
 
TODO: If you want to learn more about the `http` module, visit the official Node.js documentation:
 * https://nodejs.org/api/http.html
 */
