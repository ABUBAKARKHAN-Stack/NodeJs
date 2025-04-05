import { prisma } from '../config/prismaClient';
import expressAsyncHandler from 'express-async-handler';
//* CREATE operation — Add new data to the database
const createReq = expressAsyncHandler(async (req, res) => {
    const { title, description } = req.body; //? Extract the title and description from the request body
    console.log(title, description); //? Log the title and description to the console for debugging
    const response = await prisma.curd.create({
        data: {
            title, //? Save the title in the database
            description //? Save the description in the database
        }
    }); //? Save the new document in the database
    res.status(201).json({
        success: true, //? Indicate that the operation was successful
        message: "Created C in CRUD (Create)", //? Success message
        data: response //? Return the created data
    });
    //! If creation fails, throw an error
    throw new Error("Failed to create");
});
//* READ operation — Get data by ID
const readReq = expressAsyncHandler(async (req, res) => {
    const { id } = req.params; //? Grab the ID from the request URL
    const response = await prisma.curd.findUnique({
        where: {
            id: parseInt(id) //? Look for a document with the matching ID
        }
    }); //? Fetch the document from the database
    res.status(200).json({
        success: true, //? Indicate that the operation was successful
        message: "Created R in CRUD (Read/GET)", //? Success message
        data: response //? Return the fetched data
    });
    //! If there is an error while fetching, throw an error
    throw new Error("Error fetching data");
});
//* UPDATE operation — Update document by ID
const updateReq = expressAsyncHandler(async (req, res) => {
    const { id } = req.params; //? Get the ID from the request URL
    const { title, description } = req.body; //? Get the updated title and description from the request body
    const response = await prisma.curd.update({
        where: {
            id: parseInt(id) //? Find the document with the given ID
        },
        data: {
            title, //? Update the title in the database
            description //? Update the description in the database
        }
    });
    res.status(200).json({
        success: true, //? Indicate that the operation was successful
        message: "Created U in CRUD (Update)", //? Success message
        data: response //? Return the updated data
    });
    //! If updating the data fails, throw an error
    throw new Error("Error updating data");
});
//* DELETE operation — Remove document by ID
const deleteReq = expressAsyncHandler(async (req, res) => {
    const { id } = req.params; //? Get the ID from the request URL
    await prisma.curd.delete({
        where: { id: parseInt(id) } //? Delete the document with the given ID from the database
    });
    res.status(200).json({
        success: true, //? Indicate that the operation was successful
        message: "Created D in CRUD (Delete)" //? Success message
    });
    //! If deleting the data fails, throw an error
    throw new Error("Error deleting data");
});
//* Exporting all controllers to use them in routes
export { createReq, updateReq, readReq, deleteReq };
