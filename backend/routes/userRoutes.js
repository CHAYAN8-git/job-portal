const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
    register,
    login,
    getProfile,
    updateProfile,
    uploadResume,
} = require("../controllers/userController");
router.post("/register", register);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post(
    "/upload-resume",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);

module.exports = router;