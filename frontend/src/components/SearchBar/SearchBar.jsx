import "./SearchBar.css";

import { Search } from "lucide-react";

import Input from "../Input/Input";

function SearchBar({
    keyword,
    setKeyword,
    location,
    setLocation,
    company,
    setCompany,
    companies,
    sort,
    setSort,
    clearFilters,
}) {
    return (
        <>
            <div className="search-box">

                <div className="search-input">

                    <Search
                        size={20}
                        className="search-icon"
                    />

                    <Input
                        placeholder="Search jobs, companies..."
                        value={keyword}
                        onChange={(e) =>
                            setKeyword(e.target.value)
                        }
                    />

                </div>

            </div>

           <div className="filter-bar">

    <Input
        placeholder="Location"
        value={location}
        onChange={(e) =>
            setLocation(e.target.value)
        }
    />

    <select
        value={company}
        onChange={(e) =>
            setCompany(e.target.value)
        }
    >
        <option value="">
            All Companies
        </option>

        {companies.map((company) => (
            <option
                key={company._id}
                value={company._id}
            >
                {company.companyName}
            </option>
        ))}
    </select>

    {/* 👇 ADD THIS ENTIRE BLOCK */}
    <select
        value={sort}
        onChange={(e) =>
            setSort(e.target.value)
        }
    >
        <option value="newest">
            Newest
        </option>

        <option value="salary">
            Highest Salary
        </option>

        <option value="az">
            A - Z
        </option>
    </select>

    <button
        className="clear-btn"
        onClick={clearFilters}
    >
        Clear Filters
    </button>

</div>
        </>
    );
}

export default SearchBar;