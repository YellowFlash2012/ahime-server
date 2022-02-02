import express from "express";

import asyncHandler from "express-async-handler";
import { protect } from "../middlewares/authMiddleware.js";
import Orders from "../models/Orders.js";
const router = express.Router();

// @desc    create new order
// @route   POST /api/orders
// @access  Private
router.post(
    "/",
    protect,
    asyncHandler(async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxAmount,
            shippingAmount,
            totalAmount,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("No order items");
            return
        } else {
            const order = new Orders({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxAmount,
                shippingAmount,
                totalAmount,
            });

            const createdOrder = await order.save();

            res.status(201).json(createdOrder);
        }
    })
);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
        
        const order = await Orders.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order not found!');
        }

    })
);

export default router;
