const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const carRoutes = require('./src/routes/car.routes');
const repairRoutes = require('./src/routes/repair.routes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/car', carRoutes);
app.use('/repair', repairRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Estimates App API!');
});

// Start Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use. Trying another port...`);
                const newPort = PORT + 1;
                app.listen(newPort, () => console.log(`Server running on port ${newPort}`));
            } else {
                console.error('Server error:', err);
            }
        });
    } catch (err) {
        console.error('MongoDB connection failed:', err);
    }
}

startServer();

module.exports = app; // Export the app instance