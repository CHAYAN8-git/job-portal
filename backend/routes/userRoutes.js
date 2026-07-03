const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const {
    register,
    login,
    getProfile,
} = require("../controllers/userController");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);

module.exports = router;