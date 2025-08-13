const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../utils/errorHandler.js");
const jwt = require("jsonwebtoken");
const Favorite = require("../models/Favorite.js");

const signup = async (req, res, next) => {
    const { Telegram_username, PhoneNumber, password, email } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(errorHandler(400, "User already exists. You cannot signup."));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ Telegram_username, PhoneNumber, password: hashedPassword, email });
        const savedUser = await newUser.save();

        const fav = new Favorite({ user_id: savedUser._id, favorite_food_id: [] });
        await fav.save();
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found"));

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

        const token = jwt.sign({ id: validUser._id }, process.env.SECRET, { expiresIn: "2w" });

        const { password: hashedPassword, ...otherUserData } = validUser._doc;

        res
            .cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" })
            .status(200)
            .json(otherUserData);
    } catch (err) {
        next(err);
    }
};

const signout = (req, res, next) => {
    try {
        res.clearCookie("access_token", { path: "/", domain: "yourdomain.com" });
        res.status(200).json("User logged out");
    } catch (error) {
        next(error);
    }
};

// Export the functions for use in other modules
module.exports = {
    signup,
    login,
    signout
};