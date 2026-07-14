import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

import AuthForm from "../components/AuthForm/AuthForm";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
                "/users/login",
                formData
            );

          localStorage.setItem("token", data.token);

window.location.href = "/";
        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    }

    return (

        <AuthForm title="Welcome Back">

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Button type="submit">

                    Login

                </Button>

            </form>

        </AuthForm>

    );

}

export default Login;