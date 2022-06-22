import express from "express";
import mongoose from "mongoose";

import asyncHandler from "express-async-handler";
import { admin, protect } from "../middlewares/authMiddleware.js";
import Orders from "../models/Orders.js";
const router = express.Router();

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get(
    "/myorders",
    protect,
    asyncHandler(async (req, res) => {

        const orders = await Orders.find({ user: req.user._id });

        // console.log(req.user._id);

        res.json(orders);

    })
);

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put(
    "/:id/pay",
    protect,
    asyncHandler(async (req, res) => {

        const order = await Orders.findById(req.params.id);

        // console.log(new ObjectId(req.params));

        if (order) {
            
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address:req.body.payer.email
            }

            const updatedOrder = await order.save();

            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order not found!');
        }

    })
);
// @desc    Update order to delivered
// @route   PUT /api/orders/:id/delivered
// @access  Private
router.put(
    "/:id/delivered",
    protect,
    admin,
    asyncHandler(async (req, res) => {

        const order = await Orders.findById(req.params.id);

        if (order) {
            
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const deliveredOrder = await order.save();

            res.json(deliveredOrder);
        } else {
            res.status(404);
            throw new Error('Order not found!');
        }

    })
);

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

// @desc    Get all orders
// @route   GET /api/orders/
// @access  Private/Admin
router.get(
    "/",
    protect, admin,
    asyncHandler(async (req, res) => {

        const orders = await Orders.find({}).populate('user', 'id name');

        res.json(orders);

    })
);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {

        let id = req.params.id;
        console.log(id, req.params);

        const order = await Orders.findById(id).populate('user', 'name email');

        if (order) {
            
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order not found!');
        }

    })
);

export default router;
