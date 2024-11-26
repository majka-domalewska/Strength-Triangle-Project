const express = require("express");
const { json } = require("express");
const { connectDB } = require("./db.js");
const { signupUser, loginUser } = require("./userController.js");
const { getAnswers } = require("./dataController.js");
const cors = require("cors");
const { Db } = require("mongodb");

// Initialize the app
const app = express();
app.use(cors());
app.use(json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for '${req.url}'`);
    next();
});

(async () => {
    try {
        await connectDB();
        console.log("Connected to the database. Starting server...");

        // Start server after successful database connection
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });

        // Signup route
        app.post("/signup", async (req, res) => {
            console.log("Signup request body:", req.body);

            try {
                const { email, password } = req.body;
                const userId = await signupUser(email, password);
                res.status(201).send({ message: "User created", userId });
                console.log("User created");
            } catch (error) {
                res.status(400).send({ error: error.message });
            }
        });

        // Login route
        app.post("/login", async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await loginUser(email, password);
                res.status(200).send({ message: "Login successful", user });
                console.log("Login successful");
            } catch (error) {
                res.status(401).send({ error: error.message });
            }
        });

        // getting the collections from the server
        app.get("/", async (req, res) => {
            try {
                const { answersEn, answersNl } = await getAnswers();
        
                const answersEnInsides = await answersEn.find({}).toArray();
                const answersNlInsides = await answersNl.find({}).toArray();
        
                res.status(200).json({
                    success: true,
                    message: "Answers fetched successfully.",
                    // data: {
                    //     answersEn: answersEnInsides,
                    //     answersNl: answersNlInsides,
                    // },
                });
            } catch (error) {
                res.status(401).send({ error: error.message });
            }
        });
        

    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
})();
