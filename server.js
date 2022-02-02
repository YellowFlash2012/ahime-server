import express from 'express';
import mongoose from 'mongoose';
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js';
import colors from 'colors';
import { config } from 'dotenv';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';

config();

const app = express();

// to accept json data
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running');
})

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

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
