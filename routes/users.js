
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

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.get("/profile", protect, asyncHandler(async (req, res) => {

    // res.send('Success')
    const user = await Users.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
}))

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post("/register", asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // check if user exists
    const userExists = await Users.findOne({ email: email });

    if (userExists) {
        res.status(400);
        throw new Error('A user with that email already exists!')
    } 

    // create a new user
    const user = await Users.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400)
        throw new Error('The data you entered are not correct. Please try again!')
    }
    
}))

export default router;