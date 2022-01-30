import express from 'express'
import asyncHandler from 'express-async-handler';
const router = express.Router();

import Products from '../models/Products.js'

// @desc    fetch all products
// @route   GET /api/products
// @access  Public
router.get("/", asyncHandler(async(req, res) => {
    const products = await Products.find({});
    // {} to indicate all

    res.json(products);
}));

// @desc    fetch a particular product by its id
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", asyncHandler(async(req, res) => {
    const product = await Products.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }

}));

export default router;