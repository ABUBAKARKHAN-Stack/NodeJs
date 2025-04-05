//* Import mongoose - ODM library for MongoDB
import mongoose from "mongoose";

//* Creating and exporting async function to connect MongoDB
export const connectDb = async () => {
    try {
        //? Attempting to connect to MongoDB using URI from environment variables
        const connectionInstance = await mongoose.connect(process.env.MongoURI);

        //? Destructuring useful details from the connection object
        const { host, port, name } = connectionInstance.connection;

        //? Logging a success message with connection details
        console.log(`MongoDB is Connected ✅\n→ Host: ${host}\n→ Port: ${port}\n→ Database: ${name}`);
        
    } catch (error) {
        //! If connection fails, log the error
        console.log("❌ MongoDB Connection Error:", error);
    }
}
