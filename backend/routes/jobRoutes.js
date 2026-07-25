const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
    createJob,
    getJobs,
    getMyJobs,
    getJobById,
    updateJob,
    deleteJob,
} = require("../controllers/jobController");
router.post(
    "/",
    authMiddleware,
    roleMiddleware("recruiter", "admin"),
    createJob
);
router.get("/", getJobs);
router.get(
    "/my-jobs",
    authMiddleware,
    roleMiddleware("recruiter", "admin"),
    getMyJobs
);
router.get("/:id", authMiddleware, getJobById);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("recruiter", "admin"),
    updateJob
);
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("recruiter"),
    deleteJob
);
module.exports = router;