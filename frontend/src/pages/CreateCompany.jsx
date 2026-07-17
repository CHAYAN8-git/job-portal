import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

import "../styles/recruiter.css";

function CreateCompany() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyName: "",
        description: "",
        website: "",
        location: "",
    });

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const { data } = await api.post(
                "/companies",
                formData
            );

            toast.success(data.message);

            navigate("/recruiter");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to create company"
            );

        }

    }

    return (

        <section className="recruiter-page">

            <form
                className="recruiter-form"
                onSubmit={handleSubmit}
            >

                <h2>Create Company</h2>

                <input
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Company Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    name="website"
                    placeholder="Website"
                    value={formData.website}
                    onChange={handleChange}
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />

                <button type="submit">
                    Create Company
                </button>

            </form>

        </section>

    );

}

export default CreateCompany;