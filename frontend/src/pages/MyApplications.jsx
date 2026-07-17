import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import "../styles/profile.css";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchApplications();

    }, []);

    async function fetchApplications() {

        try {

            const { data } = await api.get(
                "/applications/my-applications"
            );

            setApplications(data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to fetch applications"
            );

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <h2 style={{ textAlign: "center", marginTop: "3rem" }}>Loading...</h2>;

    }

    return (

        <section className="profile-page">

            <h2>My Applications</h2>

            {applications.length === 0 ? (

                <div className="profile-form">

                    <h3>You haven't applied anywhere yet.</h3>

                </div>

            ) : (

                applications.map((application) => (

                    <div
                        className="profile-form"
                        key={application._id}
                    >

                        <h3>
                            {application.job.title}
                        </h3>

                        <p>

                            <strong>Company : </strong>

                            {application.job.company.companyName}

                        </p>

                        <p>

                            <strong>Location : </strong>

                            {application.job.location}

                        </p>

                        <p>

                            <strong>Status : </strong>

                            {application.status}

                        </p>

                    </div>

                ))

            )}

        </section>

    );

}

export default MyApplications;