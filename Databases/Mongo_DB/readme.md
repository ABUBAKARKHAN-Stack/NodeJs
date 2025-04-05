# 🛠️ Beginner CRUD API Tutorial with Express.js & MongoDB

This is a beginner-friendly project to demonstrate how to build a **CRUD (Create, Read, Update, Delete)** API using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

---

## 📚 What You'll Learn

- How to connect a Node.js backend to MongoDB.
- Create a Mongoose model/schema.
- Implement CRUD operations.
- Structure Express routes and controllers.
- Understand HTTP methods (POST, GET, PUT, DELETE).

---

## 📁 Project Structure

```
Mongo_DB/
│
├── config/
│   └── db.js                // MongoDB connection file
│
├── controllers/
│   └── crud.controller.js   // Contains CRUD logic
│
├── models/
│   └── crud.model.js        // Mongoose schema/model
│
├── routes/
│   └── crud.routes.js       // Express routes
│
├── .env                     // Environment variables
├── app.js                   // Entry point
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ABUBAKARKHAN-Stack/NodeJs.git
cd /databases/mongo_db
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env` file:

```env
MongoURI=your_mongodb_connection_string
PORT=your_serving_port
```

### 4. Run the App

```bash
npm run dev
```

Your server will start on `http://localhost:on-your-port`

---

## 🔌 MongoDB Connection (`config/connectDb.js`)

```js
import mongoose from "mongoose";

//* Connect to MongoDB using Mongoose
export const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MongoURI);
        const { host, port, name } = connectionInstance.connection;
        console.log(`Mongo DB is Connected with Port ${port} and host ${host} and db name is ${name}`);     
    } catch (error) {
        console.log(error);   
    }
}
```

---

## 🧠 Mongoose Model (`models/crud.model.js`)

```js
import mongoose from "mongoose";

//* Define schema
const crudSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, //! Title is required
  },
  description: {
    type: String,
    default: "", //* Optional field
  },
}, { timestamps: true }); //? Automatically adds createdAt and updatedAt

//* Export model
const Crud = mongoose.model("Crud", crudSchema);

export default Crud;
```

---

## 🧩 CRUD Controller (`controllers/crud.controller.js`)

```js
import Crud from "../models/crud.model.js";

//* Create new record
const createReq = async (req, res) => {
    const { title, description } = req.body;
    const response = await Crud.create({ title, description });

    return res.status(201).json({
        success: true,
        message: "Created C on Curd - Create",
        data: response,
    });
}

//* Read record by ID
const readReq = async (req, res) => {
    const { id } = req.params;
    const response = await Crud.findById(id);

    return res.status(200).json({
        success: true,
        message: "Created R on Curd - Read",
        data: response,
    });
}

//* Update record
const updateReq = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const response = await Crud.findByIdAndUpdate(id, { title, description }, { new: true });

    return res.status(200).json({
        success: true,
        message: "Created U on Curd - Update",
        data: response,
    });
}

//* Delete record
const deleteReq = async (req, res) => {
    const { id } = req.params;
    await Crud.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Created D on Curd - Delete",
    });
}

export {
    createReq,
    readReq,
    updateReq,
    deleteReq,
}
```

---

## 🛣️ Express Routes (`routes/crud.routes.js`)

```js
import { createReq, readReq, updateReq, deleteReq } from '../controllers/crud.controller.js';
import { Router } from 'express';

const router = Router();

//* Define all CRUD routes
router.post('/create', createReq);     //? POST /create
router.get('/read/:id', readReq);      //? GET /read/:id
router.put('/update/:id', updateReq);  //? PUT /update/:id
router.delete('/delete/:id', deleteReq); //? DELETE /delete/:id

export default router;
```

---

## 🚀 Example API Usage

### Base URL
```bash
URL: http://localhost:your-port/crud/route-name
Example:http://localhost:3001/crud/update/1
```

### ✅ Create

```bash
POST /create
Content-Type: application/json

{
  "title": "Learn Express",
  "description": "Build a backend API"
}
```

### 📖 Read

```bash
GET /read/:id
```

### 🔁 Update

```bash
PUT /update/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

### ❌ Delete

```bash
DELETE /delete/:id
```

---

## 💬 Comment Style Used

We used the following comment style throughout the code to help beginners:

- `//*` Explanation or important logic
- `//?` Thoughtful notes or questions
- `//!` Warnings or required attention
- `//Todo` Features to be added later

---

## 🧑‍💻 Author

Made with 💻 by [Abubakar Aijaz](https://github.com/ABUBAKARKHAN-Stack)

---

## 🧠 Pro Tip

Want to go full-stack? Try connecting this with a React frontend, build a simple dashboard, and use Axios to make API calls!
