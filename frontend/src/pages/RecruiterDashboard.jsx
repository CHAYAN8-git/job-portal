import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import "../styles/recruiter.css";

function RecruiterDashboard() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);

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
async function fetchApplicants(jobId) {

    try {

        const { data } = await api.get(
            `/applications/applicants/${jobId}`
        );

        setApplicants(data);

        setSelectedJob(jobId);

    } catch (error) {

        toast.error("Unable to load applicants");

    }

}
async function updateStatus(applicationId, status) {

    try {

        await api.put(
            `/applications/status/${applicationId}`,
            { status }
        );

        toast.success("Application updated");

        fetchApplicants(selectedJob);

    } catch (error) {

        toast.error("Unable to update status");

    }

}
async function deleteJob(jobId) {
    try {

        await api.delete(`/jobs/${jobId}`);

        toast.success("Job deleted successfully");

        fetchData();

    } catch (error) {

        toast.error("Unable to delete job");

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
        <Link className="dashboard-btn" to="/company/create">
          + Create Company
        </Link>

        <Link className="dashboard-btn" to="/job/create">
          + Create Job
        </Link>
      </div>

      <h2>My Companies</h2>

      {companies.map((company) => (
        <div className="dashboard-item" key={company._id}>
          <strong>{company.companyName}</strong>

          <p>{company.location}</p>
        </div>
      ))}

     <h2>My Jobs</h2>

{jobs.map((job) => (

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

       <div
    style={{
        display: "flex",
        gap: "10px",
        marginTop: "12px",
        flexWrap: "wrap",
    }}
>

    <button
        className="dashboard-btn"
        onClick={() => fetchApplicants(job._id)}
    >
        View Applicants
    </button>

    <Link
        className="dashboard-btn"
        to={`/job/edit/${job._id}`}
    >
        Edit Job
    </Link>

    <button
        className="dashboard-btn"
        onClick={() => deleteJob(job._id)}
    >
        Delete Job
    </button>

</div>
    </div>

))}
{selectedJob && (

    <>

        <h2>Applicants</h2>

        {applicants.length === 0 ? (

            <div className="dashboard-item">

                No applicants yet.

            </div>

        ) : (

            applicants.map((applicant) => (

                <div
                    className="dashboard-item"
                    key={applicant._id}
                >

                    <strong>
                        {applicant.applicant.fullName}
                    </strong>

                    <p>
                        {applicant.applicant.email}
                    </p>

                  <p>
    Status : {applicant.status}
</p>

<div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>

    <button
        className="dashboard-btn"
        onClick={() =>
            updateStatus(applicant._id, "Accepted")
        }
    >
        ✔ Accept
    </button>

    <button
        className="dashboard-btn"
        onClick={() =>
            updateStatus(applicant._id, "Rejected")
        }
    >
        ❌ Reject
    </button>

</div>

                </div>

            ))

        )}

    </>

)}
    </section>
    
  );
}

export default RecruiterDashboard;
