import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

(async () => {
    await connectDB(); // Attempt to connect to the database
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`); // Log server start only after DB connection
    });
})();
