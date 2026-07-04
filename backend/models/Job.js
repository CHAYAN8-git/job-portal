const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        salary: {
            type: Number,
            required: true,
        },

        experience: {
            type: String,
            default: "Fresher",
        },

        skills: [
            {
                type: String,
            },
        ],

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;