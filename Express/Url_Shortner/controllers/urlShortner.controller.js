import {
    loadLinks,
    saveLink
} from "../models/urlShortner.model.js";
import crypto from 'crypto';

/**
 * ? 📝 Create a shortened URL
 * ! Requires a valid URL in the request body
 */
const addShortenedLink = async (req, res) => {
    const { url, shortendCode } = req.body;
    console.log(url, shortendCode);

    //! ❌ Validate Input: Ensure URL is provided
    if (!url) {
        return res.status(400).json({
            statusCode: 400,
            error: '❌ URL is required'
        });
    }

    //* 🔄 Load existing links
    const linksData = await loadLinks();

    //! ❌ Check if custom shortcode already exists
    if (shortendCode && linksData[shortendCode]) {
        return res.status(400).json({
            statusCode: 400,
            error: '⚠️ Shortened code already exists'
        });
    }

    //* 🎲 Generate a random shortcode if none is provided
    const finalShortendCode = shortendCode || crypto.randomBytes(4).toString('hex');

    //* 💾 Save the new shortened link
    await saveLink({ ...linksData, [finalShortendCode]: url });

    res.status(201).json({
        statusCode: 201,
        message: '✅ Link saved successfully',
        shortUrl: `http://localhost:3000/${finalShortendCode}`
    });
};

/**
 * ? 📥 Retrieve all stored links
 */
const getLinks = async (req, res) => {
    const linksData = await loadLinks();
  //  return res.status(200).json(linksData); //* 👈🏻 This was before
  res.render("index" , {
    links: linksData
  }); // * 👈🏻 This is the new one

};

/**
 * ? 🔗 Redirect to the original URL using shortcode
 */
const redirectToOriginalUrl = async (req, res) => {
    const { shortendCode } = req.params;
    const linksData = await loadLinks();

    //* ✅ Redirect if shortcode exists
    if (linksData[shortendCode]) {
        return res.redirect(linksData[shortendCode]);
    }

    //! ❌ If shortcode not found
    return res.status(404).json({
        statusCode: 404,
        error: "⚠️ Link not found"
    });
};

/**
 * ? 🗑️ Delete a shortened link
 */
const deleteUrl = async (req, res) => {
    const { shortendCode } = req.params;
    const linksData = await loadLinks();

    //* ✅ If link exists, delete it
    if (linksData[shortendCode]) {
        delete linksData[shortendCode];
        await saveLink(linksData);

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
};

export {
    addShortenedLink,
    getLinks,
    redirectToOriginalUrl,
    deleteUrl
};
