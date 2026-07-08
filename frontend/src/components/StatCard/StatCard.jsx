import "./StatCard.css";

function StatCard({ number, label }) {
    return (
        <div className="stat-card">

            <h2>{number}</h2>

            <p>{label}</p>

        </div>
    );
}

export default StatCard;