import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import AuthForm from "../components/AuthForm/AuthForm";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "student",
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

            const response = await api.post("/users/register", formData);

            toast.success(response.data.message);

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch (error) {

            toast.error(
                error.response?.data?.message || "Registration Failed"
            );

        }

    }

    return (

        <AuthForm title="Create Your Account">

            <form onSubmit={handleSubmit} className="auth-form">

                <Input
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                />

                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="role-select"
                >

                    <option value="student">
                        Student
                    </option>

                    <option value="recruiter">
                        Recruiter
                    </option>

                </select>

                <Button type="submit">

                    Register

                </Button>

            </form>

        </AuthForm>

    );

}

export default Register;