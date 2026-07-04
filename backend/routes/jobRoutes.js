const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
} = require("../controllers/jobController");

router.post("/", authMiddleware, createJob);

router.get("/", authMiddleware, getJobs);

router.get("/:id", authMiddleware, getJobById);

router.put("/:id", authMiddleware, updateJob);

module.exports = router;