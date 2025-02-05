/*
 * 🚀 EXPRESS APP: Creating an Express application
 ? 💡 INFO: This project demonstrates various Express.js features, including:
 * - Setting up an Express server.
 * - Serving static files using `express.static`.
 * - Parsing JSON and URL-encoded data.
 * - Implementing modular routing for cleaner code.
 TODO: Run `npm install` to install dependencies.
 TODO: Use `npm run dev` to start the server.
 */

// =============================
// 📦 Import Dependencies
// =============================
import express, { json, urlencoded, static as static_ } from 'express';
import "dotenv/config"; // ? Load environment variables from .env file


const app = express(); // * Initialize Express application


app.set('view engine', 'ejs');

// =============================
// 🌐 Serve Static Files
// =============================
/*
 * 💡 INFO: Static files (HTML, CSS, JS, images) are served from the 'public' directory.
 * - Example: `http://localhost:3000/index.html` will serve `public/index.html`.
 */
app.use(static_('public'));

// =============================
// ⚙️ Middleware Configuration
// =============================
/*
 * 🚀 CONFIG: Parsing incoming requests
 * - `express.json()`: Parses JSON payloads (max size: 32kb).
 * - `express.urlencoded()`: Parses URL-encoded payloads (allows nested objects).
 */
app.use(json({ limit: "32kb" }));
app.use(urlencoded({ extended: true }));

// =============================
// 🔗 Routes Configuration
// =============================
/*
 * 📌 ROUTES: Load URL Shortener Routes
 * - All URL-related API endpoints are handled in `routes/url.routes.js`
 * - Mounted under `/shortend` (e.g., `/shortend/create`, `/shortend/:code`).
 */
import urlRoute from "./routes/url.routes.js";
app.use(urlRoute);

// =============================
// 🚀 Start Server
// =============================
const PORT = process.env.PORT || 3000; // * Use port from .env or default to 3000

/*
 * 🟢 SERVER: Start Listening
 * - The server listens for incoming requests on the specified port.
 * - Logs a confirmation message to indicate it's running.
 */
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
