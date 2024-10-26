import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();

// Allow all origins
app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());
app.use('/', productRoutes);

export default app;