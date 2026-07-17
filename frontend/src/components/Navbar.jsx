import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">

            <div className="logo">
                Job<span>Portal</span>
            </div>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/jobs">Jobs</Link>

                {user ? (
                    <>
                        <Link to="/my-applications">
                            My Applications
                        </Link>

                        <Link
                            className="profile-btn"
                            to="/profile"
                        >
                            {user.fullName}
                        </Link>

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;