import { useEffect, useState } from "react";
import api from "../services/api";

function useAuth() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetchProfile();

    }, []);

    async function fetchProfile() {

        try {

            const { data } = await api.get("/users/profile");

            setUser(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return user;

}

export default useAuth;