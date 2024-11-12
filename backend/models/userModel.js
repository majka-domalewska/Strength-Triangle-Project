import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ // user model
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
}, {
    timestamps: true // created and updated at...
});

const user = mongoose.model("User", userSchema); // mongoose changes the name by itself for the users collection

export default user;