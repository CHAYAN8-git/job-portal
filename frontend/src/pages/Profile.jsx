import { useState, useRef } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import "../styles/profile.css";

function Profile() {
    const { user, setUser } = useAuth();

    const fileRef = useRef();

    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        college: user?.college || "",
        branch: user?.branch || "",
        bio: user?.bio || "",
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
            const { data } = await api.put(
                "/users/profile",
                formData
            );

            setUser(data.user);

            toast.success(data.message);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Profile Update Failed"
            );

        }
    }

    async function handleResumeUpload() {

        const file = fileRef.current.files[0];

        if (!file) {
            toast.error("Please select a PDF resume.");
            return;
        }

        const uploadData = new FormData();

        uploadData.append("resume", file);

        try {

            const { data } = await api.post(
                "/users/upload-resume",
                uploadData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUser((prev) => ({
                ...prev,
                resume: data.resume,
            }));

            toast.success(data.message);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Resume Upload Failed"
            );

        }

    }

    return (
        <section className="profile-page">

            <form
                className="profile-form"
                onSubmit={handleSubmit}
            >

                <h2>My Profile</h2>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="college"
                    placeholder="College"
                    value={formData.college}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="branch"
                    placeholder="Branch"
                    value={formData.branch}
                    onChange={handleChange}
                />

                <textarea
                    name="bio"
                    placeholder="Bio"
                    value={formData.bio}
                    onChange={handleChange}
                />

                <hr />

                <h3>Resume</h3>

                <input
                    type="file"
                    ref={fileRef}
                    accept=".pdf"
                />

                <button
                    type="button"
                    onClick={handleResumeUpload}
                >
                    Upload Resume
                </button>

                {user?.resume && (
                    <a
                        href={`http://localhost:3000/${user.resume}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        📄 View Uploaded Resume
                    </a>
                )}

                <button type="submit">
                    Save Changes
                </button>

            </form>

        </section>
    );
}

export default Profile;