import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MyApplications from "./pages/MyApplications";
import CreateCompany from "./pages/CreateCompany";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route
                    path="/my-applications"
                    element={
                        <ProtectedRoute>
                            <MyApplications />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/my-applications"
    element={
        <ProtectedRoute>
            <MyApplications />
        </ProtectedRoute>
    }
/>
<Route
    path="/company/create"
    element={
        <ProtectedRoute>
            <CreateCompany />
        </ProtectedRoute>
    }
/>

<Route
    path="/recruiter"
    element={
        <ProtectedRoute>
            <RecruiterDashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/job/create"
    element={
        <ProtectedRoute>
            <CreateJob />
        </ProtectedRoute>
    }
/>
            </Routes>
        </>
    );
}

export default App;