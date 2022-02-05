
import express from "express";
import mongoose from 'mongoose';
import asyncHandler from "express-async-handler";
import { admin, protect } from "../middlewares/authMiddleware.js";
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



// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin Only
router.delete("/:id", protect, admin, asyncHandler(async (req, res) => {

    const user = await Users.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({message:'User removed'});
    } else {
        res.status(404);
        throw new Error('User not found');
    }
    
}))

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private/admin
router.put("/:id", protect, admin, asyncHandler(async (req, res) => {

    const user = await Users.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        user.isAdmin = req.body.isAdmin || user.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
}))

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin Only
router.get("/", protect, admin, asyncHandler(async (req, res) => {

    const users = await Users.find({});
    res.json(users);
}))


// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin Only
router.get("/:id", protect, admin, asyncHandler(async (req, res) => {

    // let id = req.params.id;

    // if (id.match(/^[0-9a-fA-F]{24}$/)) {
    //     next();
    // }

    const user = await Users.findById(req.params.id).select("-password");

    console.log(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}))

export default router;