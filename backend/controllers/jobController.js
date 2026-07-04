const Job = require("../models/Job");

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
        const jobs = await Job.find()
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

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
};