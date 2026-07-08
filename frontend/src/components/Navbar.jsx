import { Link } from "react-router-dom";
import "../styles/navbar.css";
function Navbar() {
    return (
        <nav className="navbar">

            <div className="logo">
                Job<span>Portal</span>
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>

                <Link className="profile-btn" to="/profile">
                    Profile
                </Link>
            </div>

        </nav>
    );
}

export default Navbar;