const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListModel = require("../models/blacklist.model");

module.exports.signUp = async (req, res, next) => {
  // Implement logic to sign in a user
  // Return a JWT token
  // Example:
  const { username, email, password, role } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // check if the user is already exist
  const isUserAlreadyExists = await userModel.findOne({ email });
  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create a new user
  const newUser = new userModel({
    username,
    email,
    password: hashedPassword,
    role,
  });
  await newUser.save();
  // generate a JWT token
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    message: "User signed in successfully",
    user: newUser,
    token,
  });
};

module.exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "User signed in successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const { token } = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "token is required" });
    }
    const isTokenBlacklisted = await blackListModel.findOne({ token: token });
    if (isTokenBlacklisted) {
      return res.status(400).json({ message: "Token is blacklisted" });
    }

    await blackListModel.create({ token: token });
  } catch (error) {
    next(error);
  }
};

module.exports.getProfile = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.status(200).json({ 
        message: "User profile retrieved successfully",
        user,
 
     });
  } catch (error) {
    next(error);
  }
};
