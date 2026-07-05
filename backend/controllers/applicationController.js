const Application = require("../models/Application");
const Job = require("../models/Job");

const applyJob = async (req, res) => {
    try {
        const { jobId } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        const alreadyApplied = await Application.findOne({
            applicant: req.user.userId,
            job: jobId,
        });

        if (alreadyApplied) {
            return res.status(400).json({
                message: "Already Applied",
            });
        }

        const application = await Application.create({
            applicant: req.user.userId,
            job: jobId,
        });

        res.status(201).json({
            message: "Applied Successfully",
            application,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            applicant: req.user.userId,
        }).populate({
            path: "job",
            populate: {
                path: "company",
            },
        });

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getApplicants = async (req, res) => {
    try {
        const applications = await Application.find({
            job: req.params.jobId,
        }).populate("applicant", "-password");

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        application.status = status;

        await application.save();

        res.status(200).json({
            message: "Status Updated",
            application,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    applyJob,
    getMyApplications,
    getApplicants,
    updateApplicationStatus,
};