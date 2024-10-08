// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import ConnectToMongoDb from './connection.js';
import AuthRouter from './Router/AuthRouter.js';
import dotenv from 'dotenv'; // Load environment variables

// Load environment variables
dotenv.config(); // Use dotenv to load `.env` file

// Initialize express app
const app = express();

// Port from environment variables or fallback to 5000
const PORT = process.env.PORT || 5000;

// MongoDB connection string from environment variables
const MONGOURL = process.env.NODE_MONGO_URL;

if (!MONGOURL) {
  console.error("MongoDB URL is missing. Please check your environment variables.");
  process.exit(1); // Exit the app if no MongoDB URL is provided
}



// Connect to MongoDB
ConnectToMongoDb(MONGOURL);

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
app.use("/auth", AuthRouter); // Routes related to authentication

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
