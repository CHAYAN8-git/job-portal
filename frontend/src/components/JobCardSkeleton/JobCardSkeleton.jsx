import "./JobCardSkeleton.css";

function JobCardSkeleton() {
    return (
        <div className="job-card skeleton-card">

            <div className="skeleton skeleton-title"></div>

            <div className="skeleton skeleton-company"></div>

            <div className="skeleton skeleton-location"></div>

            <div className="skeleton skeleton-salary"></div>

            <div className="skeleton skeleton-button"></div>

        </div>
    );
}

export default JobCardSkeleton;