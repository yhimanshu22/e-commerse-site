import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allow specific headers
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Respond OK to preflight requests
    }
    
    next();
});


app.use(express.json());
app.use('/', productRoutes);

export default app;