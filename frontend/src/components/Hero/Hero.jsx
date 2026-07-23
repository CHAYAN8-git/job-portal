import "./Hero.css";

import StatCard from "../StatCard/StatCard";
import Badge from "../Badge/Badge";
import Card from "../Card/Card";

function Hero({ stats }) {
  return (
    <section className="hero">
      <Badge>🚀 India's Smart Placement Portal</Badge>

      <h1>
        Launch Your <span>Dream Career</span>
      </h1>

      <p className="hero-description">
        Connect with top companies, discover exciting opportunities, and
        kickstart your career journey.
      </p>

      <div className="hero-stats">
        <Card>
          <StatCard number={stats.jobs} label="Jobs" />
        </Card>

        <Card>
          <StatCard number={stats.companies} label="Companies" />
        </Card>

        <Card>
          <StatCard number="1000+" label="Students" />
        </Card>
      </div>
    </section>
  );
}

export default Hero;