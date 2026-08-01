import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./JobCard.css";

import api from "../../services/api";

import Card from "../Card/Card";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";

function JobCard({
    jobId,
    recruiterId,
    title,
    company,
    location,
    salary,
    type,
}) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [applied, setApplied] = useState(false);

    async function handleApply() {

        if (applied) return;

        try {

            setLoading(true);

            const { data } = await api.post(
                "/applications/apply",
                {
                    jobId,
                }
            );

            toast.success(data.message);

            setApplied(true);

        } catch (error) {

            if (
                error.response?.data?.message ===
                "Already Applied"
            ) {

                setApplied(true);

            }

            toast.error(
                error.response?.data?.message ||
                "Application Failed"
            );

        } finally {

            setLoading(false);

        }

    }

    async function handleMessageRecruiter() {

        try {

            const { data } = await api.post(
                "/conversations",
                {
                    receiverId: recruiterId,
                }
            );

            navigate(
                `/chat?conversation=${data._id}`
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to start conversation"
            );

        }

    }

    return (

        <Card>

            <div className="job-card">

                <Badge>{type}</Badge>

                <h3>{title}</h3>

                <p>

                    {company} • {location}

                </p>

                <div className="job-footer">

                    <span>{salary}</span>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "15px",
                    }}
                >

                    <Button
                        onClick={handleApply}
                        disabled={loading || applied}
                    >

                        {
                            loading
                                ? "Applying..."
                                : applied
                                ? "Applied ✓"
                                : "Apply"
                        }

                    </Button>

                    <Button
                        onClick={handleMessageRecruiter}
                    >
                        Message
                    </Button>

                </div>

            </div>

        </Card>

    );

}

export default JobCard;