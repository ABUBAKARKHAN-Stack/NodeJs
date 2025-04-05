import Crud from "../models/crud.model.js"; //* Import the Mongoose model

//* CREATE operation — Add new data to MongoDB
const createReq = async (req, res) => {
    try {
        const { title, description } = req.body; //? Extract data sent from the client

        const response = await Crud.create({ title, description }); //? Save new document in DB

        return res.status(201).json({
            success: true,
            message: "Created C in CRUD (Create)",
            data: response
        }); //? Send success response with created data
    } catch (error) {
        //! If creation fails, catch the error
        return res.status(500).json({
            success: false,
            message: "Error creating data",
            error
        });
    }
};

//* READ operation — Get data by ID
const readReq = async (req, res) => {
    try {
        const { id } = req.params; //? Grab the ID from URL
        const response = await Crud.findById(id); //? Search for document with matching ID

        return res.status(200).json({
            success: true,
            message: "Created R in CRUD (Read/GET)",
            data: response
        });
    } catch (error) {
        //! Handle DB fetch errors
        return res.status(500).json({
            success: false,
            message: "Error fetching data",
            error
        });
    }
};

//* UPDATE operation — Update document by ID
const updateReq = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const response = await Crud.findByIdAndUpdate(
            id,
            { title, description },
            { new: true } //? Ensures updated document is returned
        );

        return res.status(200).json({
            success: true,
            message: "Created U in CRUD (Update)",
            data: response
        });
    } catch (error) {
        //! Catch update errors
        return res.status(500).json({
            success: false,
            message: "Error updating data",
            error
        });
    }
};

//* DELETE operation — Remove document by ID
const deleteReq = async (req, res) => {
    try {
        const { id } = req.params;
        await Crud.findByIdAndDelete(id); //? Deletes document from DB

        return res.status(200).json({
            success: true,
            message: "Created D in CRUD (Delete)"
        });
    } catch (error) {
        //! Catch deletion errors
        return res.status(500).json({
            success: false,
            message: "Error deleting data",
            error
        });
    }
};

//* Exporting all controllers for use in routes
export {
    createReq,
    updateReq,
    readReq,
    deleteReq
};
