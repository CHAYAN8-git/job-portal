const Job = require("../models/Job");
const Application = require("../models/Application");

const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            company,
            location,
            salary,
            experience,
            skills,
        } = req.body;

        const job = await Job.create({
            title,
            description,
            company,
            location,
            salary,
            experience,
            skills,
            createdBy: req.user.userId,
        });

        res.status(201).json({
            message: "Job Created Successfully",
            job,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getJobs = async (req, res) => {
    try {

        const keyword = req.query.keyword || "";
        const location = req.query.location || "";
        const company = req.query.company || "";

        const page = Number(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const filter = {
            title: {
                $regex: keyword,
                $options: "i",
            },
            location: {
                $regex: location,
                $options: "i",
            },
        };

        if (company) {
            filter.company = company;
        }

        const sort = req.query.sort || "newest";

        let sortOption = {};

        switch (sort) {
            case "salary":
                sortOption = { salary: -1 };
                break;

            case "az":
                sortOption = { title: 1 };
                break;

            default:
                sortOption = { createdAt: -1 };
        }

        const totalJobs = await Job.countDocuments(filter);

       const jobs = await Job.find(filter)
    .populate("company")
    .populate("createdBy", "fullName email role")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

        res.status(200).json({
            jobs,
            totalJobs,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getMyJobs = async (req, res) => {
    try {

        const jobs = await Job.find({
            createdBy: req.user.userId,
        })
            .populate("company")
            .populate("createdBy", "fullName email");

        res.status(200).json(jobs);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const getJobById = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id)
            .populate("company")
            .populate("createdBy", "fullName email");

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        res.status(200).json(job);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const updateJob = async (req, res) => {
    try {

        const {
            title,
            description,
            location,
            salary,
            experience,
            skills,
        } = req.body;

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        if (job.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not authorized to update this job",
            });
        }

        job.title = title || job.title;
        job.description = description || job.description;
        job.location = location || job.location;
        job.salary = salary || job.salary;
        job.experience = experience || job.experience;
        job.skills = skills || job.skills;

        await job.save();

        res.status(200).json({
            message: "Job Updated Successfully",
            job,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const deleteJob = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        if (job.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this job",
            });
        }

        // Delete all applications related to this job
        await Application.deleteMany({
            job: req.params.id,
        });

        // Delete the job
        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Job deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    createJob,
    getJobs,
    getMyJobs,
    getJobById,
    updateJob,
    deleteJob,
};