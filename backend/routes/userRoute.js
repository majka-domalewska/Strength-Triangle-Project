import express from "express";
import { getUsers, signupUser, updateUser, deleteUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signupUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/login", loginUser);

export default router;