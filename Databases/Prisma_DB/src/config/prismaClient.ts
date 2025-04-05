import { PrismaClient } from "@prisma/client"; //? Import the PrismaClient class from the Prisma package

//* Create an instance of PrismaClient to interact with your database
export const prisma = new PrismaClient(); //? Export the instance so you can use it in other parts of your application
