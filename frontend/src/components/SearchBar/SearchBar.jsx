import "./SearchBar.css";
import Button from "../Button/Button";
import Input from "../Input/Input";

function SearchBar() {
    return (
        <div className="search-box">
            <Input
                type="text"
                placeholder="Search jobs..."
            />

            <Button>
                Search
            </Button>
        </div>
    );
}

export default SearchBar;