const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registorUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    // Validate request body
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    // Check if username already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
        res.status(400);
        throw new Error("Username is already taken. Choose another.");
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        res.status(400);
        throw new Error("Email is already registered.");
    }

    // Create a new user
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create the user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registorUser, authUser };
