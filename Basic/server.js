// ? Basic Node.js Server
/**
 * This code creates a simple HTTP server using Node.js.
 * The server listens for requests on port 3000 and responds to two cases:
 * - If the URL is `/`, it responds with a JSON message: "Hello World".
 * - For all other URLs, it responds with "404 Not Found".
 * 
 * @todo To run this server:
 * 1. Save the file (e.g., `server.js`).
 * 2. In your terminal, run the command: `npm run start`.
 *    (Ensure the `start` script is defined in your `package.json`.)
 */

const http = require("http"); // ! Node.js HTTP module for server creation.

const server = http.createServer(); // @ Create an HTTP server instance.

const PORT = 3000; // @ Define the port the server will listen on.

server.on("request", (req, res) => {
    // ? Handle incoming HTTP requests.
    if (req.url === "/") {
        // @ Check if the request URL is the root path.
        res.writeHead(200, { "Content-Type": "application/json" }); // @ Set response headers for JSON content.
        res.end(
            JSON.stringify({
                message: "Hello World", // @ JSON response message.
            })
        );
    } else {
        // @ Handle all other paths.
        res.end("404 Not Found"); // ! Respond with a 404 message.
    }
});

server.listen(PORT, () => {
    // ? Start the server and log its status.
    console.log(`Server is running on port ${PORT}`); // @ Inform the user of the active server port.
});
