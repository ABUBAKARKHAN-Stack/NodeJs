/*
*🚀 EXPRESS APP: Creating an Express application
*💡 INFO: Importing necessary modules and configuring the app
TODO: First Run npm install to install dependencies
TODO: Run npm run dev to start the server
*/

import express, { json, urlencoded, static as static_ } from 'express';

const app = express();

/* 
*💡 INFO: Serving static files from the 'public' directory.
*/
app.use(static_('public'));

/* 
*🚀 CONFIG: Middleware to parse JSON and URL-encoded data
*/
app.use(json({ limit: "32kb" }));
app.use(urlencoded({ extended: true }));

/* 
*📌 ROUTES: Importing the URL shortening routes 
*/
import urlRoute from "./routes/url.routes.js"
app.use("/shortend", urlRoute);

/* 
*🟢 SERVER: Listening on port 3000 
*/
app.listen(3000, () => {
    console.log('✅ Server is running on port 3000');
});
