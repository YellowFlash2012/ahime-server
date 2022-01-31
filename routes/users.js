
import express from "express";
import asyncHandler from "express-async-handler";
import Users from "../models/Users.js";
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
            token:null
        })
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
}))

export default router;