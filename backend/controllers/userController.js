const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({
            message: "User Registered Successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
module.exports = {
    register,
    login,
    getProfile,
};