import express from "express";

import products from "./data/products.js";
import users from "./data/users.js";
import Products from "./models/Products.js";
import Orders from "./models/Orders.js";
import Users from "./models/Users.js";
import mongoose from "mongoose";
import colors from "colors";
import { config } from "dotenv";
import connectDB from "./config/db.js";

const app = express();

config();

// mongoose connection script
const PORT = process.env.PORT || 5000;
connectDB()

// *****import script*****
const importData = async () => {
    try {
        // clear the db
        await Orders.deleteMany();
        await Products.deleteMany();
        await Users.deleteMany();

        // create admin
        const createdUsers = await Users.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // add admin user to the products
        const sampleProducts = products.map((p) => {
            return { ...p, user: adminUser };
        });

        // create products
        await Products.insertMany(sampleProducts);

        console.log("Data imported!".green.inverse);

        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // clear the db
        await Orders.deleteMany();
        await Products.deleteMany();
        await Users.deleteMany();

        console.log("Data destroyed!".red.inverse);

        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
