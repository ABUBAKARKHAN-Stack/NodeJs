import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { Router } from "express";

const route = Router();
const Data_Path = path.join("data", "link.json");

/* 
?📝 POST: Create a shortened URL
*/
route.post("/url", async (req, res) => {
    let { url, shortendCode } = req.body;
    console.log(url, shortendCode);

    //! ❌ Validate Input: Ensure URL is provided
    if (!url) {
        return res.status(400).json({
            statusCode: 400,
            error: '❌ URL is required'
        });
    }

    //* Remove White Spaces
    if (shortendCode.trim().includes(" ")) {
       shortendCode = shortendCode.replaceAll(/\s+/g, "-")
    }
    

    //* 🔄 Load existing links
    const links = await fs.readFile(Data_Path, 'utf8');
    const linksData = links ? JSON.parse(links) : {};

    //! ❌ Check if custom shortcode already exists
    if (linksData[shortendCode]) {
        return res.status(400).json({
            statusCode: 400,
            error: '⚠️ Shortened code already exists'
        });
    }

    //* 🎲 Generate a random shortcode if none is provided
    const finalShortendCode = shortendCode || crypto.randomBytes(4).toString('hex');

    //* 💾 Save the new shortened link
    await fs.writeFile(Data_Path, JSON.stringify({ ...linksData, [finalShortendCode]: url }), "utf-8");

    res.status(200).json({
        statusCode: 200,
        message: '✅ Link saved successfully',
        link: `http://localhost:3000/${finalShortendCode}`
    });
});

/* 
?📥 GET: Retrieve all stored links 
*/
route.get("/get-links", async (req, res) => {
    const linksObj = await fs.readFile(Data_Path, "utf-8");
    const parsedLinkObj = linksObj ? JSON.parse(linksObj) : {};

    return res.status(200).json({ ...parsedLinkObj });
});

/* 
?🔗 GET: Redirect to original URL using shortcode
*/
route.get("/:shortendCode", async (req, res) => {
    const shortendCode = req.url.slice(1);
    const linksObj = await fs.readFile(Data_Path, "utf-8");
    const parsedLinkObj = linksObj ? JSON.parse(linksObj) : {};

    //* ✅ Redirect if shortcode exists
    if (parsedLinkObj[shortendCode]) {
        return res.redirect(parsedLinkObj[shortendCode]);
    }

    //! ❌ If shortcode not found
    return res.status(404).json({
        statusCode: 404,
        error: "⚠️ Link not found"
    });
});

/* 
?🗑️ DELETE: Remove a shortened link
*/
route.delete('/delete/:shortendCode', async (req, res) => {
    const { shortendCode } = req.params;
    const linksObj = await fs.readFile(Data_Path, "utf-8");
    const parsedLinkObj = linksObj ? JSON.parse(linksObj) : {};

    //* ✅ If link exists, delete it
    if (parsedLinkObj[shortendCode]) {
        delete parsedLinkObj[shortendCode];
        await fs.writeFile(Data_Path, JSON.stringify(parsedLinkObj), "utf-8");

        return res.status(200).json({
            statusCode: 200,
            message: "✅ Link deleted successfully"
        });
    }

    //! ❌ If shortcode not found
    return res.status(404).json({
        statusCode: 404,
        error: "⚠️ Link not found"
    });
});

export default route; //* Export the router
