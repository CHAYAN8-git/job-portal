import "./JobCard.css";

import Card from "../Card/Card";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";

function JobCard({
    title,
    company,
    location,
    salary,
    type,
}) {
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

                    <Button>
                        Apply
                    </Button>

                </div>

            </div>
        </Card>
    );
}

export default JobCard;