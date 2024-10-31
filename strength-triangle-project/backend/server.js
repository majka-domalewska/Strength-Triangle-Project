const express = require("express");
const { json } = require("express");
const { connectDB } = require("./db");
const { signupUser, loginUser } = require("./userController");

// Initialize the app
const app = express();
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
            } catch (error) {
                res.status(401).send({ error: error.message });
            }
        });

    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
})();
