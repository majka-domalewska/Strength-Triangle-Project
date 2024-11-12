import express from "express";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows to accept json data in the req.body

app.use("/api/users", userRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server started @ http://localhost:" + PORT);
});