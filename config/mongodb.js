const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('Connected to MongoDB');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectToDatabase;




