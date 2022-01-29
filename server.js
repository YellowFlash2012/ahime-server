import express from 'express';
import mongoose from 'mongoose';
import colors from 'colors';
import { config } from 'dotenv';
import products from './data/products.js';

config();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running');
})

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = find((p) => p._id === req.params.id);

    res.json(product);
})

const PORT=process.env.PORT || 5000


// database connection algo
mongoose
    .connect(process.env.MONGO_URI)
    .then(
        app.listen(PORT, () => {
            console.log(
                `Server running in ${process.env.NODE_ENV} mode | Port ${PORT}`.yellow.bold
            );

            console.log("DB connected!".cyan.underline.bold);
        })
    )
    .catch((err) => {
        console.log(err.red.bold);
    });
