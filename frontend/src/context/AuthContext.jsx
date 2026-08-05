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

        function handleOnlineUsers(users) {
            setOnlineUsers(users);
        }

        socket.on("online-users", handleOnlineUsers);

        return () => {
            socket.off("online-users", handleOnlineUsers);
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

            socket.off("connect");

            socket.on("connect", () => {

                console.log("🟢 Socket Connected:", socket.id);

                socket.emit("join", data._id);

                console.log("✅ Joined Room:", data._id);

            });

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