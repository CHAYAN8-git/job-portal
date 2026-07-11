import { useEffect, useState } from "react";
import "./FeaturedJobs.css";

import api from "../../services/api";
import JobCard from "../JobCard/JobCard";

function FeaturedJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    async function fetchJobs() {

        try {

            const { data } = await api.get("/jobs");

            setJobs(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <section className="featured-jobs">

            <h2>Featured Opportunities</h2>

            <p>
                Explore opportunities from leading companies.
            </p>

            <div className="jobs-grid">

                {jobs.map((job) => (

                    <JobCard

                        key={job._id}

                        title={job.title}

                        company={
                            job.company?.companyName ||
                            job.company?.name ||
                            "Company"
                        }

                        location={job.location}

                        salary={`₹${job.salary}`}

                        type={job.experience}

                    />

                ))}

            </div>

        </section>

    );

}

export default FeaturedJobs;