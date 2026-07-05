const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
} = require("../controllers/companyController");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("recruiter", "admin"),
    createCompany
);
router.get("/", authMiddleware, getCompanies);

router.get("/:id", authMiddleware, getCompanyById);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("recruiter", "admin"),
    updateCompany
);
module.exports = router;