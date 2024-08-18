import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CssFiles/Navbar.css"; // Import the CSS file
import logo from "../Assets/tripLogo.png"; // Adjust the path according to your project structure

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user authentication and role in local storage
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsAuthenticated(true);
      setRole(parsedUser.role || ""); // Adjust based on how roles are stored
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage and update authentication state
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="upper-nav">
          <div className="logo-container">
            <img src={logo} alt="Company Logo" className="logo" />
            <Link to="/" className="company-name">
              𝓖𝓾𝓲𝓭𝓮𝓡𝓲𝓭𝓮
            </Link>
          </div>

          <div className="nav-links">
            <div className="profile-menu">
              {isAuthenticated ? (
                role === "ADMIN" ? (
                  <>
                    <Link className="nav-link" to="/CarAdmin">
                      Car Page
                    </Link>
                    <Link className="nav-link" to="/GuideAdmin">
                      Guide Page
                    </Link>
                    <Link className="nav-link" to="/TripAdmin">
                      Trip Page
                    </Link>
                    <Link className="nav-link" to="/BookingAdmin">
                      Bookings Page
                    </Link>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </>
                ) : role === "SUPER_ADMIN" ? (
                  <>
                    <Link className="nav-link" to="/SuperAdminPage">
                      Super Admin Page
                    </Link>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="nav-link" to="/UserProfile">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </>
                )
              ) : (
                <>
                  <Link className="nav-link" to="/aboutus">
                    About Us
                  </Link>
                  <Link className="nav-link" to="/#services">
                    Services
                  </Link>
                  <Link className="nav-link" to="/#faqs">
                    FAQs
                  </Link>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
