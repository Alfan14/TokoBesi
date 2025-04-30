import express from "express";
import cors from "cors";
import multer from 'multer';
import bodyParser from 'body-parser';
import "./loadEnviroment.mjs";
import "express-async-errors";
import products from "./routes/api/products.mjs";
import authRoutes from "./routes/api/authRoute.mjs";
import checkRole from './middleware/rbacMiddleware.mjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const upload = multer();

// Initialize apps
const PORT = process.env.PORT || 5000;
const app = express()

// Body parser middleware
app.use(express.json())

// Uploading arrays
app.use(upload.array()); 

// Cors
app.use(cors());

// Use route
app.use('/auth', authRoutes); 
app.use('/api/products', products)

// Global error handling
app.use((err, _req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});