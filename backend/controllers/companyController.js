const Company = require("../models/Company");

const createCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;

        const company = await Company.create({
            companyName,
            description,
            website,
            location,
            createdBy: req.user.userId,
        });

        res.status(201).json({
            message: "Company Created Successfully",
            company,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate(
            "createdBy",
            "fullName email"
        );

        res.status(200).json(companies);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).populate(
            "createdBy",
            "fullName email"
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
            });
        }

        res.status(200).json(company);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;

        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
            });
            if (company.createdBy.toString() !== req.user.userId) {
    return res.status(403).json({
        message: "You are not authorized to update this company",
    });
}
        }

        company.companyName = companyName || company.companyName;
        company.description = description || company.description;
        company.website = website || company.website;
        company.location = location || company.location;

        await company.save();

        res.status(200).json({
            message: "Company Updated Successfully",
            company,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
};