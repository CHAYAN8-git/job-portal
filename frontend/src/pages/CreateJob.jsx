import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";import { toast } from "react-toastify";

import api from "../services/api";
import "../styles/recruiter.css";

function CreateJob() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [companies, setCompanies] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        experience: "",
        skills: "",
    });
const isEdit = Boolean(id);
    useEffect(() => {
    fetchCompanies();

    if (isEdit) {
        fetchJob();
    }
}, []);

    async function fetchCompanies() {

        try {

            const { data } = await api.get("/companies");

            setCompanies(data);

        } catch (error) {

            toast.error("Unable to load companies");

        }

    }

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }
async function fetchJob() {

    try {

        const { data } = await api.get(`/jobs/${id}`);

        setFormData({
            title: data.title,
            description: data.description,
            company: data.company._id,
            location: data.location,
            salary: data.salary,
            experience: data.experience,
            skills: data.skills.join(", "),
        });

    } catch (error) {

        toast.error("Unable to load job");

    }

}
    async function handleSubmit(e) {

    e.preventDefault();

    try {

        const payload = {
            ...formData,
            skills: formData.skills
                .split(",")
                .map(skill => skill.trim()),
        };

        let data;

        if (isEdit) {

            const response = await api.put(
                `/jobs/${id}`,
                payload
            );

            data = response.data;

        } else {

            const response = await api.post(
                "/jobs",
                payload
            );

            data = response.data;

        }

        toast.success(data.message);

        navigate("/recruiter");

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            (isEdit
                ? "Unable to update job"
                : "Unable to create job")
        );

    }

}

    return (

        <section className="recruiter-page">

            <form
                className="recruiter-form"
                onSubmit={handleSubmit}
            >

<h2>
    {isEdit ? "Edit Job" : "Create Job"}
</h2>
                <input
                    name="title"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <select
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                >

                    <option value="">
                        Select Company
                    </option>

                    {companies.map(company => (

                        <option
                            key={company._id}
                            value={company._id}
                        >
                            {company.companyName}
                        </option>

                    ))}

                </select>

                <input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />

                <input
                    name="salary"
                    type="number"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={handleChange}
                />

                <input
                    name="experience"
                    placeholder="Experience"
                    value={formData.experience}
                    onChange={handleChange}
                />

                <input
                    name="skills"
                    placeholder="React, Node, MongoDB"
                    value={formData.skills}
                    onChange={handleChange}
                />

              <button type="submit">
    {isEdit ? "Update Job" : "Create Job"}
</button>

            </form>

        </section>

    );

}

export default CreateJob;