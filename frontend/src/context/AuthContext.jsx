import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {

        socket.on("online-users", (users) => {

            setOnlineUsers(users);

        });

        return () => {

            socket.off("online-users");

        };

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

            if (!socket.connected) {

                socket.connect();

            }

            socket.emit("join", data._id);

        } catch (error) {

            console.log("Profile Error:", error.response);

            localStorage.removeItem("token");

            setUser(null);

        } finally {

            setLoading(false);

        }

    }

    function logout() {

        socket.disconnect();

        localStorage.removeItem("token");

        setUser(null);

        window.location.href = "/";

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                onlineUsers,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}