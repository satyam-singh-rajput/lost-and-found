import express from "express";
import { MONGODBURL } from './config.js';
import mongoose from "mongoose";
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';

// const whitelist = ['http://localhost:3000' ];
dotenv.config({ path: '../.env' }); 

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());// to parse json dat in the req body
app.use(express.urlencoded({ extended: true })); // to parse form data in the re body
app.use(cookieParser());

app.get(('/'), (req, res) => {
    console.log("Server started.");
    return res.status(200).send("Server started successfully.");
});

app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

mongoose.connect(MONGODBURL).then(() => {
    const PORT = process.env.PORT || 5000; // Access PORT from environment variables
    app.listen(PORT, () => {
        console.log('Connected to database');
        console.log(`Listening on port ${PORT}`);
    });
}).catch((error) => {
    console.log("Error connecting to database: ", error);
});
