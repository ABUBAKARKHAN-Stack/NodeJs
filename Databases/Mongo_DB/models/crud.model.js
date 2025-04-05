//* Import mongoose to define schema and model
import mongoose from "mongoose";

//* Define a schema (structure) for CRUD documents
const crudSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
    //! 'title' is a required field. MongoDB will throw an error if this is missing.
  },
  description: {
    type: String,
    default: "", 
    //* 'description' is optional, defaults to an empty string if not provided.
  },
}, {
  timestamps: true 
  //* Adds createdAt and updatedAt fields automatically to every document
});

//* Create a model based on the schema
const Crud = mongoose.model("Crud", crudSchema);

//* Export the model so it can be used in controllers/routes
export default Crud;
