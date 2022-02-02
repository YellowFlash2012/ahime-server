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
            throw new Error("No error items");
            return;
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

export default router;
