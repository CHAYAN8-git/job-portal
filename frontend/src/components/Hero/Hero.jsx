import "./Hero.css";

import SearchBar from "../SearchBar/SearchBar";
import StatCard from "../StatCard/StatCard";
import Badge from "../Badge/Badge";
import Card from "../Card/Card";
function Hero() {
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

      <SearchBar />

      <div className="hero-stats">
        <Card>
          <StatCard number="500+" label="Jobs" />
        </Card>
        <Card>
          <StatCard number="500+" label="Jobs" />
        </Card>
        <Card>
          <StatCard number="500+" label="Jobs" />
        </Card>
      </div>
    </section>
  );
}

export default Hero;
