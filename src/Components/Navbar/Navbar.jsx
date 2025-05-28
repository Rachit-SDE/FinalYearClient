import React, { useState } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (sectionId) => {
    setMenu(sectionId);

    const scrollToSection = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      // Delay scroll to ensure Home page has loaded
      setTimeout(scrollToSection, 300);
    } else {
      scrollToSection();
    }
  };

  return (
    <div className="navbar">
      <div className="inner-navbar">
        <div className="navbar-logo">
          <img src={assets.SiteLogo} alt="Site Logo" />
        </div>
        <div className="navbar-links">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={`navbar-link cursor-pointer ${menu === "home" ? "active" : ""}`}
          >
            Home
          </Link>
          <span
            onClick={() => handleScroll("about")}
            className={`navbar-link cursor-pointer ${menu === "about" ? "active" : ""}`}
          >
            About
          </span>
          <span
            onClick={() => handleScroll("blog")}
            className={`navbar-link cursor-pointer ${menu === "blog" ? "active" : ""}`}
          >
            Blogs
          </span>
          <span
            onClick={() => handleScroll("contact")}
            className={`navbar-link cursor-pointer ${menu === "contact" ? "active" : ""}`}
          >
            Contact
          </span>
        </div>
        <div className="navbar-login">
          {!isLoggedIn ? (
            <div className="login-outer">
              <Link className="navbar-login-button" to="/login">
                Login
              </Link>
            </div>
          ) : (
            <div className="account-profile">
              <Link to="/dashboard/profile" className="navbar-logout-button">
                <img src={assets.account} alt="Profile" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
