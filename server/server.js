const express = require('express');
const cors = require('cors'); // Import cors
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const openaiRoutes = require('./routes/openaiRoutes');

dotenv.config();

// Connect to the database
connectDB();

const app = express(); // Initialize the Express application

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Your React app's origin
    credentials: true, // Allow credentials if needed
}));

app.use(express.json()); // This is necessary to parse JSON request bodies

// Define your routes
app.use('/api/auth', authRoutes); // Register auth routes
app.use('/api/openai', openaiRoutes); // Register OpenAI routes

// Set the port
const PORT = process.env.PORT || 5003;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/test', (req, res) => {
  
    res.send('Test route is working!');
});