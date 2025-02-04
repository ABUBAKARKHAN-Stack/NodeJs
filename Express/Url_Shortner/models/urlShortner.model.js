import fs from 'fs/promises';
import path from 'path';

//* 📁 Define the path for storing links
const Data_Path = path.join("data", "link.json");

/**
 * 🔄 Load existing links from the JSON file
 * @returns {Object} An object containing all stored links
 */
const loadLinks = async () => {
    try {
        //* 📥 Read the file content
        const links = await fs.readFile(Data_Path, 'utf8');

        //* 📝 Parse JSON content (if file is empty, return an empty object)
        const linksData = links ? JSON.parse(links) : {};
        return linksData;
    } catch (error) {
        //* ❌ Handle error (if file does not exist, return an empty object)
        console.error("⚠️ Error loading links:", error);
        return {};
    }
};

/**
 * 💾 Save links to the JSON file
 * @param {Object} linksData - The updated link data to be saved
 */
const saveLink = async (linksData) => {
    try {
        //* 📝 Write updated data to the file
        await fs.writeFile(Data_Path, JSON.stringify(linksData, null, 2), "utf-8");
        console.log("✅ Links saved successfully!");
    } catch (error) {
        //* ❌ Handle error if saving fails
        console.error("⚠️ Error saving links:", error);
    }
};

export {
    loadLinks,
    saveLink
};
