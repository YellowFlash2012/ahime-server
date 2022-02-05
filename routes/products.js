import express from 'express'
import asyncHandler from 'express-async-handler';

import { admin, protect } from "../middlewares/authMiddleware.js";

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

// @desc    delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, asyncHandler(async(req, res) => {
    const product = await Products.findById(req.params.id);

    if (product) {
        await product.remove();

        res.json({message:'Product removed!'});
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }

}));

// @desc    create a product
// @route   POST /api/products
// @access  Private/Admin
router.post("/", protect, admin, asyncHandler(async(req, res) => {
    const product = new Products({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);


}));

// @desc    update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put("/:id", protect, admin, asyncHandler(async(req, res) => {
    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
    } = req.body;

    const product = await Products.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found')
    }

    


}));

export default router;