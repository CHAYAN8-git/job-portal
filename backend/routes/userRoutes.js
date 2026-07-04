const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const {
    register,
    login,
    getProfile,
    updateProfile,
} = require("../controllers/userController");
router.post("/register", register);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;