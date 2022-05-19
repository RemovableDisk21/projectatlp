import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../../static/images/bulsu.png";
import logo2 from "../../static/images/cict.png";
import "../../static/header.css";

function Navbar() {
    return (
        <nav id="navbarrers" className="navbar navbarrers navbar-expand-lg navbar-light shadow sticky-top">
            <div className="container-fluid">
                <div class="logo-container">
                    <img class="bulsu-logo" src={logo1} alt=""></img>
                    <img class="cict-logo" src={logo2} alt=""></img>
                </div>
                <div class="brand-container">
                    <Link id="bulsu-brand" className="navbar-brand" to="/">Bulacan State University</Link>
                    <p class="college-brand">College of Information and Communications Technology</p>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link-menu" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link-menu" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;