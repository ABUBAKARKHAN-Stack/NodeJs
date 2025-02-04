import { Router } from "express";
import {
    addShortenedLink,
    deleteUrl,
    getLinks,
    redirectToOriginalUrl
} from '../controllers/urlShortner.controller.js';

const route = Router();

/* 
? 📝 POST: Create a shortened URL
! Requires a valid URL in the request body
*/
route.post("/url", addShortenedLink);

/* 
? 📥 GET: Retrieve all stored links 
! Returns an object containing all saved URLs
*/
route.get("/get-links", getLinks);

/* 
? 🔗 GET: Redirect to original URL using shortcode
! If the shortcode exists, it redirects; otherwise, returns a 404 error
*/
route.get("/:shortendCode", redirectToOriginalUrl);

/* 
? 🗑️ DELETE: Remove a shortened link
! Deletes the corresponding entry from storage
*/
route.delete('/delete/:shortendCode', deleteUrl);

export default route; //* 🚀 Export the router module
