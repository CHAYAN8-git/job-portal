import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import "../styles/recruiter.css";

function RecruiterDashboard() {

    const [companies, setCompanies] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {

        try {

           const [companyRes, jobRes] = await Promise.all([
api.get("/companies/my-companies"),
    api.get("/jobs/my-jobs"),
]);

            setCompanies(companyRes.data);
            setJobs(jobRes.data);

        } catch (error) {

            toast.error("Unable to load dashboard");

        }

    }

    return (

        <section className="recruiter-page">

            <h1>Recruiter Dashboard</h1>

            <div className="dashboard-stats">

                <div className="dashboard-card">

                    <h2>{companies.length}</h2>

                    <p>Companies</p>

                </div>

                <div className="dashboard-card">

                    <h2>{jobs.length}</h2>

                    <p>Jobs</p>

                </div>

            </div>

            <div className="dashboard-actions">

                <Link
                    className="dashboard-btn"
                    to="/company/create"
                >
                    + Create Company
                </Link>

                <Link
                    className="dashboard-btn"
                    to="/job/create"
                >
                    + Create Job
                </Link>

            </div>

            <h2>My Companies</h2>

            {companies.map(company => (

                <div
                    className="dashboard-item"
                    key={company._id}
                >

                    <strong>
                        {company.companyName}
                    </strong>

                    <p>
                        {company.location}
                    </p>

                </div>

            ))}

            <h2>Jobs</h2>

            {jobs.map(job => (

                <div
                    className="dashboard-item"
                    key={job._id}
                >

                    <strong>
                        {job.title}
                    </strong>

                    <p>
                        {job.company?.companyName}
                    </p>

                </div>

            ))}

        </section>

    );

}

export default RecruiterDashboard;