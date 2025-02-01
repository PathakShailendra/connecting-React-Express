const express = require('express');
const app = express();
const connectDB = require('./config/mongodb');
const userRoutes = require('./routes/user.routes');
const indexRoutes = require('./routes/index.routes');
connectDB();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzllNWU3NDhlZWY0NDRkOGU4MjAwNGUiLCJpYXQiOjE3Mzg0MzIxMTYsImV4cCI6MTczODQzNTcxNn0.s3pS_aIPcvseDHUnJdadQYDOUxdBL1jH_wayRxELYZQ

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', indexRoutes);
app.use('/user', userRoutes);

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});