import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env);

// const envProcessing = process.env;
// console.log(envProcessing);

const mongo_uri="mongodb+srv://user1:12345@thestrengthtriangle.xibbo.mongodb.net/?retryWrites=true&w=majority&appName=TheStrengthTriangle"

export const connectDB = async () => {
    console.log(mongo_uri); // Corrected to log the value of MONGO_URI

    try {
        const conn = await mongoose.connect(mongo_uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};