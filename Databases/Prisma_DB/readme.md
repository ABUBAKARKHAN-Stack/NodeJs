# 🛠️ Beginner CRUD API with Express.js, Prisma (SQLite), and TypeScript

This beginner-friendly project demonstrates how to build a **CRUD (Create, Read, Update, Delete)** API using **Node.js**, **Express.js**, **Prisma (with SQLite)**, and **TypeScript**.

---

## 📚 What You'll Learn

- How to set up a Node.js backend with **Express.js**.
- How to connect to a **SQLite** database using **Prisma**.
- Create and manage a **Prisma schema**.
- Implement **CRUD operations**.
- Structure **Express routes** and **controllers**.
- Understand **HTTP methods** (POST, GET, PUT, DELETE).

---

## 📁 Project Structure
```
Prisma-DB/
│
├── dist/ # Compiled JavaScript output (auto-generated)
│
├── prisma/
│ └── schema.prisma # Prisma schema (data models & configuration)
│
├── src/
│ ├── config/
│ │ └── prismaClient.ts # Prisma client configuration
│ │
│ ├── controllers/
│ │ └── crud.controller.ts # CRUD operations logic
│ │
│ ├── routes/
│ │ └── crud.routes.ts # Express route definitions
│ │
│ └── app.ts # Application entry point
│
├── .env # Environment variables
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation

```
---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ABUBAKARKHAN-Stack/NodeJs
cd databases/prisma_db
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Prisma

```bash
npx prisma init
```

### 4. Configure Prisma Schema
Edit the prisma/schema.prisma file to match the provided schema.

### 5. Run Prisma Migrations
```bash
npx prisma migrate dev --name init
```

### 6. Set Up Environment Variables
Create a .env file in the root of the project and add the following:
```bash
PORT=3000
```

### 7. Run the App
```bash
npm run dev
```
Your server will start on http://localhost:3000.

---
## 🔌 Prisma Setup (prisma/schema.prisma)

 ```js
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Crud {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
---
## 🧠 Prisma Client (src/config/prismaClient.ts)
```js 
import { PrismaClient } from "@prisma/client"; //? Import the PrismaClient class from the Prisma package

//* Create an instance of PrismaClient to interact with your database
export const prisma = new PrismaClient(); //? Export the instance so you can use it in other parts of your application
```

---
## 🧩 CRUD Controller (src/controllers/crud.controller.ts)
```js
import { Response, Request } from 'express';
import { prisma } from '../config/prismaClient'
import expressAsyncHandler from 'express-async-handler';

//* CREATE operation — Add new data to the database
const createReq = expressAsyncHandler(async (req: Request, res: Response) => {

    const { title, description }: { title: string; description: string } = req.body; //? Extract the title and description from the request body
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
const readReq = expressAsyncHandler(async (req: Request, res: Response) => {

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
const updateReq = expressAsyncHandler(async (req: Request, res: Response) => {

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
const deleteReq = expressAsyncHandler(async (req: Request, res: Response) => {

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
export {
    createReq,
    updateReq,
    readReq,
    deleteReq
};
```
---
## 🛣️ Express Routes (src/routes/crud.routes.ts)

```js
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

//* Exporting router to be used in main app file (app.ts/server.ts)
export default router;
```
---
## 🧠 TypeScript Configuration (tsconfig.json)

```js 
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```
---
## 💬 Comment Style Used
We used the following comment style throughout the code to help beginners:

//* Explanation or important logic

//? Thoughtful notes or questions

//! Warnings or required attention

//Todo Features to be added later

---

🧑‍💻 Author
Made with 💻 by Abubakar Aijaz

---

## 🧠 Pro Tip
Want to go full-stack? Try connecting this with a React frontend, build a simple dashboard, and use Axios to make API calls!