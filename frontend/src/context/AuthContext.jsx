import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
    const token = localStorage.getItem("token");

    console.log("Token:", token);

    if (!token) {
        setLoading(false);
        return;
    }

    try {
        const { data } = await api.get("/users/profile");

        console.log("Profile:", data);

        setUser(data);
    } catch (error) {
        console.log("Profile Error:", error.response);

        localStorage.removeItem("token");
        setUser(null);
    } finally {
        setLoading(false);
    }
}
   function logout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
}

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}