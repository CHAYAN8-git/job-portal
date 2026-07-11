const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
} = require("../controllers/jobController");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("recruiter", "admin"),
    createJob
);
router.get("/", getJobs);
router.get("/:id", authMiddleware, getJobById);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("recruiter", "admin"),
    updateJob
);
module.exports = router;