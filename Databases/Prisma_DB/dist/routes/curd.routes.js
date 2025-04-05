//* Importing necessary modules
import { createReq, readReq, updateReq, deleteReq } from '../controllers/crud.controller.js'; //? Controller functions for handling logic
import { Router } from 'express'; //? Express Router to define modular routes
//* Creating a router instance
const router = Router(); //? Router helps separate concerns and group routes
//* Define routes for CRUD operations
//? CREATE: Add a new document
router.post('/create', createReq);
// Example: POST http://localhost:3000/crud/create
//? READ: Get document by ID
router.get('/read/:id', readReq);
// Example: GET http://localhost:3000/crud/read/123456
//? UPDATE: Modify existing document by ID
router.put('/update/:id', updateReq);
// Example: PUT http://localhost:3000/crud/update/123456
//? DELETE: Remove document by ID
router.delete('/delete/:id', deleteReq);
// Example: DELETE http://localhost:3000/crud/delete/123456
//* Exporting router to be used in main app file (app.js/server.js)
export default router;
