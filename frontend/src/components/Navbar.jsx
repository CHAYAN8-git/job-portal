import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Job Portal</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </nav>
    );
}

export default Navbar;