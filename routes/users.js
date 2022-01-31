
import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middlewares/authMiddleware.js";
import Users from "../models/Users.js";
import generateToken from "../utils/generateToken.js";
const router = express.Router();

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
}))

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get("/profile", protect, asyncHandler(async (req, res) => {

    // res.send('Success')
    const user = await Users.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
}))

export default router;