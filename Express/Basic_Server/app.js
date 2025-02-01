// ? Basic Express.js Server
/*
 * This code creates a simple HTTP server using Express.js.
 * The server listens for requests on port 3000 and responds to two cases:
 * - If the URL is `/`, it responds with a plain text message: "Hello World".

 * TODO: To run this server:
 * 1. Save the file (e.g., `app.js`).
 * 2. In your terminal, run the command: `npm run start`.
 *    (Ensure the `start` script is defined in your `package.json`.)
 */

import express from 'express';
// ? Import the Express module to create the server
// * Express is a web framework for Node.js that simplifies the creation of web servers and handling HTTP requests and responses.

const app = express();
// * Initialize an Express app instance
// * The `express()` function creates an instance of the Express application, stored in the `app` variable. 
//   This is the main object used for routing, handling requests, and configuring middleware.

app.get('/', (req, res) => {
    // ? Define a route handler for the root URL ('/')
    // * `app.get()` is a method used to define a route that handles HTTP GET requests for the given path ('/'). 
    //   In this case, it listens for GET requests to the root URL, i.e., when someone visits `http://localhost:3000/`.

    res.send('Hello World');
    // * Respond with "Hello World" message when this route is accessed
    // * The `res.send()` method sends a response back to the client with the string "Hello World".
    //   It immediately ends the request-response cycle by sending the data to the client.

});

app.listen(3000, () => {
    // ? Start the server on port 3000
    // * `app.listen()` is a method used to bind and listen for incoming connections on the specified port.
    //   In this case, the server will listen on port 3000.

    console.log('Server is running on port 3000');
    // * Log a message indicating the server is running
    // * Once the server starts listening, this log message is displayed in the console, letting the developer know the server is running and accessible.
});
