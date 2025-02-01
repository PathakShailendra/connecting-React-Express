const express = require('express');
const app = express();
const connectDB = require('./config/mongodb');
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});