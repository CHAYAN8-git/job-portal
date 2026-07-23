import { useEffect, useState } from "react";

import Hero from "../Hero/Hero";
import FeaturedJobs from "../FeaturedJobs/FeaturedJobs";
import api from "../../services/api";
import SearchBar from "../SearchBar/SearchBar";
function JobListing({ showHero = true }) {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, location, company, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [keyword, location, company, sort]);

  async function fetchJobs() {
    try {
      setLoading(true);

      const { data } = await api.get("/jobs", {
        params: {
          keyword,
          location,
          company,
          sort,
          page,
        },
      });

      if (page === 1) {
        setJobs(data.jobs);
      } else {
        setJobs((prev) => [...prev, ...data.jobs]);
      }

      setTotalJobs(data.totalJobs);

      setStats((prev) => ({
        ...prev,
        jobs: data.totalJobs,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    setSort("newest");
    setPage(1);
  }

  function loadMore() {
    setPage((prev) => prev + 1);
  }

  return (
    <>
      {showHero && <Hero stats={stats} />}

      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        location={location}
        setLocation={setLocation}
        company={company}
        setCompany={setCompany}
        companies={companies}
        sort={sort}
        setSort={setSort}
        clearFilters={clearFilters}
      />

      <FeaturedJobs
        jobs={jobs}
        totalJobs={totalJobs}
        loadMore={loadMore}
        loading={loading}
      />
    </>
  );
}

export default JobListing;
