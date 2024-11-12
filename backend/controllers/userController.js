import User from "../models/userModel.js";
import mongoose from "mongoose";

export const getUsers = async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log(`Error in fetching users: ${error.message}`);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const signupUser = async (req, res) => {
    const user = req.body; // user will send this data (data body)

    const { email } = req.body;

    try {
        const userExists = await User.findOne({ email });
        console.log(userExists);

        if (userExists) {
            return res.status(400).json({ success: false, message: "Log in instead!" });
        } if (!user.email || !user.password ) {
            return res.status(400).json({ success: false, message: "Please fill in all fields (name, email, password)" });
        }
    
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });

    } catch(error) {
        console.error(`Error in "Create User": ${error.message}`);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateUser = async (req,res) => {
    const { id } = req.params;

    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "User not found" });
    }

    try {
        const updatedUser = await user.findByIdAndUpdate(id, user, {new:true});
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteUser = async (req,res) => {
    const { id } = req.params;
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "User not found" });
    }

    try {
        await user.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted"});
    } catch (error) {
        console.error(`Error in "Delete User": ${error.message}`);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {

            // const isMatch = await bcrypt.compare(password, user.password);
            // to be used later with password encryption

            if (password !== user.password) {
                res.status(404).json({ success: false, message: "wrong password" });
            } else {
            res.status(200).json({ success: true, data: {email}});
            // console.log("Success");
            }

        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(`Error in fetching users: ${error.message}`);
        res.status(500).json({ success: false, message: "Server error" });
    }
};