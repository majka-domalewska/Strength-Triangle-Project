const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
    try {
        await client.connect();
        console.log("Database connected successfully.");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

// A function to check if the client is connected
function isConnected() {
    return client && client.topology && client.topology.isConnected();
}

connectDB();

module.exports = { client, connectDB, isConnected };
