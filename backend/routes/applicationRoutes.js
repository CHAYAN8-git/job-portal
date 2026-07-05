const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
    applyJob,
    getMyApplications,
    getApplicants,
    updateApplicationStatus,
} = require("../controllers/applicationController");

router.post(
    "/apply",
    authMiddleware,
    roleMiddleware("student"),
    applyJob
);
router.get(
    "/my-applications",
    authMiddleware,
    roleMiddleware("student"),
    getMyApplications
);
router.get(
    "/applicants/:jobId",
    authMiddleware,
    roleMiddleware("recruiter", "admin"),
    getApplicants
);
router.put(
    "/status/:id",
    authMiddleware,
    roleMiddleware("recruiter", "admin"),
    updateApplicationStatus
);
module.exports = router;