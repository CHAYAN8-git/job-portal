import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
function Navbar() {
    const { user, logout } = useAuth();
const { theme, toggleTheme } = useTheme();
    return (
        <nav className="navbar">
<Link
    to={user?.role === "recruiter" ? "/recruiter" : "/"}
    className="logo"
>

    Job<span>Portal</span>

</Link>

            <div className="nav-links">

<button
    className="theme-btn"
    onClick={toggleTheme}
>

    {theme === "light" ? (

        <Moon size={20} />

    ) : (

        <Sun size={20} />

    )}

</button>
                <Link to="/">Home</Link>

                <Link to="/jobs">Jobs</Link>

               {user ? (

    <>

        {user.role === "student" && (
            <Link to="/my-applications">
                My Applications
            </Link>
        )}

        {user.role === "recruiter" && (
            <>
                <Link to="/recruiter">
                    Dashboard
                </Link>

                <Link to="/company/create">
                    Create Company
                </Link>

                <Link to="/job/create">
                    Create Job
                </Link>
            </>
        )}

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