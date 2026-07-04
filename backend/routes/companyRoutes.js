const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
} = require("../controllers/companyController");

router.post("/", authMiddleware, createCompany);

router.get("/", authMiddleware, getCompanies);

router.get("/:id", authMiddleware, getCompanyById);

router.put("/:id", authMiddleware, updateCompany);

module.exports = router;