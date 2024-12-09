const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Estimates App API!');
});

// Start Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
    mongoose
        .connect(MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
        .catch((err) => console.error('MongoDB connection failed:', err));
}

startServer();