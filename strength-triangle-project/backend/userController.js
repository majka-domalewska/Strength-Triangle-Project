const { client, isConnected } = require("./db");
const bcrypt = require("bcrypt");

async function signupUser(email, password) {
    if (!isConnected()) {
        throw new Error("Database not connected.");
    }

    const db = client.db("strength_triangle");
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) throw new Error("User already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await users.insertOne({ email, password: hashedPassword });
    return result.insertedId;
}

async function loginUser(email, password) {
    if (!isConnected()) {
        throw new Error("Database not connected.");
    }

    const db = client.db("strength_triangle");
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) throw new Error("User not found.");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Invalid credentials.");

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = { signupUser, loginUser };
