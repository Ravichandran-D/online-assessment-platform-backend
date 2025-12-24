//db.js
const mongoose = require("mongoose");
require("dotenv").config();

//get mongo URL from .env file
// Support both `MONGO_URL` and `MONGODB_URI` environment variable names
const mongoURL = process.env.MONGO_URL || process.env.MONGODB_URI

if (!mongoURL) {
    console.error('Missing MongoDB connection string. Set MONGO_URL or MONGODB_URI in your .env file.');
    console.error('You can run `npm run setup` to create a .env interactively.');
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;