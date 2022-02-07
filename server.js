import path from 'path';

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js';
import colors from 'colors';
import { config } from 'dotenv';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';
import uploadRoute from './routes/uploadRoute.js'

config();

const app = express();

// to get an overvie of http verbs involved in a FE req
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

// to accept json data
app.use(express.json())


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoute);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// to make the upload folder not available
const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// serving the FE with the index.html
if (process.env.NODE_ENV==='production') {
    app.use(express.static(path.join(__dirname, './public')));

    app.get('*', (req,res)=>res.sendFile(path.resolve(__dirname, 'public', 'index.html')))
} else {
    app.get("/", (req, res) => {
        res.send("API is running");
    });
}

// custom middleware for NOT FOUND error handling
app.use(notFound)

// custom middleware for error handling
app.use(errorHandler)

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
