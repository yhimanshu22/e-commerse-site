import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://e-commerse-site-seven.vercel.app/',
    credentials: true
}));

app.use(express.json());
app.use('/', productRoutes);

export default app;