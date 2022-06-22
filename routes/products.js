import express from 'express'
import asyncHandler from 'express-async-handler';
import apicache from "apicache";

import { admin, protect } from "../middlewares/authMiddleware.js";
import Products from '../models/Products.js'

const router = express.Router();
const cache = apicache.middleware;


// @desc    get top rated products
// @route   GET /api/products/top
// @access  Public
router.get("/top", cache("60 minutes"), asyncHandler(async(req, res) => {
    const products = await Products.find({}).sort({ rating: -1 }).limit(3);

    res.json(products);
}));

// @desc    fetch all products
// @route   GET /api/products
// @access  Public
router.get(
    "/",
    
    asyncHandler(async (req, res) => {
        // pagination
        const numofPages = 10;
        const page = +req.query.pageNumber || 1;

        // req.query to get anything qfter the ? in the url - search box functionality
        const keyword = req.query.keyword
            ? {
                  name: {
                      $regex: req.query.keyword,
                      $options: "i",
                  },
              }
            : {};

        const count = await Products.countDocuments({ ...keyword });
        const products = await Products.find({ ...keyword })
            .limit(numofPages)
            .skip(numofPages * (page - 1));
        // {} to indicate all

        res.json({ products, page, pages: Math.ceil(count / numofPages) });
    })
);

// @desc    fetch a particular product by its id
// @route   GET /api/products/:id
// @access  Public
router.get(
    "/:id",
    
    asyncHandler(async (req, res) => {
        const product = await Products.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error("Product not found!");
        }
    })
);

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
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found')
    }

    


}));

// @desc    create new review
// @route   POST /api/products/:id/reviews
// @access  Private
router.post("/:id/reviews", protect, asyncHandler(async(req, res) => {
    const { rating, comment } = req.body;

    const product = await Products.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed!')
        }

        const review = {
            name: req.user.name,
            rating: +(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();

        res.status(201).json({ message: 'Review added!' });
    } else {
        res.status(404);
        throw new Error('Product not found')
    }

    


}));



export default router;