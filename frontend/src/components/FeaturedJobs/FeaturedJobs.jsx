import "./FeaturedJobs.css";

import JobCard from "../JobCard/JobCard";
import JobCardSkeleton from "../JobCardSkeleton/JobCardSkeleton";

function FeaturedJobs({ jobs, loadMore, totalJobs, loading }) {
    return (
        <section className="featured-jobs">

            <h2>Featured Opportunities</h2>

            <p>
                Explore opportunities from leading companies.
            </p>

            <div className="jobs-grid">

                {loading ? (

                    [...Array(6)].map((_, index) => (
                        <JobCardSkeleton key={index} />
                    ))

                ) : jobs.length > 0 ? (

                    jobs.map((job) => (

                       <JobCard
    key={job._id}
    jobId={job._id}
    recruiterId={job.createdBy._id}
    title={job.title}
    company={job.company.companyName}
    location={job.location}
    salary={`₹${(job.salary / 100000).toFixed(1)} LPA`}
    type={job.experience}
/>

                    ))

                ) : (

                    <h3>No Jobs Found</h3>

                )}

            </div>

            {!loading && jobs.length < totalJobs && (

                <div className="load-more-container">

                    <button
                        className="load-more-btn"
                        onClick={loadMore}
                    >
                        Load More
                    </button>

                </div>

            )}

        </section>
    );
}

export default FeaturedJobs;