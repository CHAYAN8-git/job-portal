import "./SearchBar.css";

import { Search } from "lucide-react";

import Button from "../Button/Button";
import Input from "../Input/Input";

function SearchBar() {
    return (
        <div className="search-box">

            <div className="search-input">

                <Search
                    size={20}
                    className="search-icon"
                />

                <Input
                    placeholder="Search jobs, companies..."
                />

            </div>

            <Button>

                Search

            </Button>

        </div>
    );
}

export default SearchBar;