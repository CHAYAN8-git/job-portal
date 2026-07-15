import { useState } from "react";
import { toast } from "react-toastify";

import "./JobCard.css";

import api from "../../services/api";

import Card from "../Card/Card";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";

function JobCard({
    jobId,
    title,
    company,
    location,
    salary,
    type,
}) {

    const [loading, setLoading] = useState(false);

    async function handleApply() {

        try {

            setLoading(true);

            const { data } = await api.post(
                "/applications/apply",
                {
                    jobId,
                }
            );

            toast.success(data.message);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Application Failed"
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <Card>

            <div className="job-card">

                <Badge>
                    {type}
                </Badge>

                <h3>{title}</h3>

                <p>
                    {company} • {location}
                </p>

                <div className="job-footer">

                    <span>{salary}</span>

                    <Button
                        onClick={handleApply}
                        disabled={loading}
                    >
                        {loading ? "Applying..." : "Apply"}
                    </Button>

                </div>

            </div>

        </Card>

    );

}

export default JobCard;