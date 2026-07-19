import { useEffect, useState } from "react";

import Hero from "../components/Hero/Hero";
import TrustedCompanies from "../components/TrustedCompanies/TrustedCompanies";
import FeaturedJobs from "../components/FeaturedJobs/FeaturedJobs";
import Footer from "../components/Footer/Footer";

import api from "../services/api";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [sort, setSort] = useState("newest");
  const [keyword, setKeyword] = useState("");

  const [location, setLocation] = useState("");

  const [company, setCompany] = useState("");

  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
  });
  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, location, company ,sort]);

  async function fetchJobs() {
    try {
      const { data } = await api.get("/jobs", {
        params: {
          keyword,
          location,
          company,
          sort,
        },
      });

      setJobs(data);
      
      setStats((prev) => ({
        ...prev,
        jobs: data.length,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCompanies() {
    try {
      const { data } = await api.get("/companies");
      setCompanies(data);

      setStats((prev) => ({
        ...prev,
        companies: data.length,
      }));
    } catch (error) {
      console.error(error);
    }
  }
  function clearFilters() {
    setKeyword("");
    setLocation("");
    setCompany("");
  }
  return (
    <>
      <Hero
       sort={sort}
    setSort={setSort}
        clearFilters={clearFilters}
        stats={stats}
        keyword={keyword}
        setKeyword={setKeyword}
        location={location}
        setLocation={setLocation}
        company={company}
        setCompany={setCompany}
        companies={companies}
      />

      <TrustedCompanies />

      <FeaturedJobs jobs={jobs} />

      <Footer />
    </>
  );
}

export default Home;
