/*
 * 🚀 EXPRESS APP: Creating an Express application
 ? 💡 INFO: This project demonstrates a wide range of Express.js features, including:
 * - Setting up an Express server.
 * - Serving static files using the `express.static` middleware.
 * - Using middleware to parse JSON and URL-encoded data.
 * - Implementing modular routing for better code organization.
 TODO: First, run `npm install` to install dependencies.
 TODO: Run `npm run dev` to start the server.
 */

 import express, { json, urlencoded, static as static_ } from 'express';
 import "dotenv/config"; // ? Import environment variables from the .env file
 
 const app = express(); // * Create an Express application instance.
 
 /*
  * 💡 INFO: Serving static files from the 'public' directory.
  * - The `express.static` middleware is used to serve static files (e.g., HTML, CSS, JS, images).
  * - Files in the `public` directory can be accessed directly via the browser (e.g., `http://localhost:3000/file.html`).
  */
 app.use(static_('public'));
 
 /*
  * 🚀 CONFIG: Middleware to parse JSON and URL-encoded data.
  * - `express.json()`: Parses incoming requests with JSON payloads.
  * - `express.urlencoded()`: Parses incoming requests with URL-encoded payloads.
  * - `limit: "32kb"`: Limits the size of incoming request bodies to 32kb.
  * - `extended: true`: Allows parsing of nested objects in URL-encoded data.
  */
 app.use(json({ limit: "32kb" }));
 app.use(urlencoded({ extended: true }));
 
 /*
  * 📌 ROUTES: Importing the URL shortening routes.
  * - Modular routing is used to organize routes into separate files.
  * - The `urlRoute` module handles all routes related to URL shortening.
  * - Routes are mounted under the `/shortend` path (e.g., `/shortend/create`).
  */
 import urlRoute from "./routes/url.routes.js";
 app.use("/shortend", urlRoute);
 
 const PORT = process.env.PORT || 3000; // * Use the port defined in the .env file, or default to 3000 if not set.
 
 /*
  * 🟢 SERVER: Listening on port 3000.
  * - The server starts and listens for incoming requests on port 3000.
  * - A confirmation message is logged to the console once the server is running.
  */
 app.listen(PORT, () => {
     console.log(`✅ Server is running on port ${PORT}`);
 });
 