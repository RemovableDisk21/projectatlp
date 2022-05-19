import React from "react";
import logo1 from "../../static/images/bulsu.png";
import logo2 from "../../static/images/cict.png";
import "../../static/header.css";

const Navbar = () => {
    return (
        <nav id="navbarrer" className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <div class="logo-container">
                <img class="bulsu-logo" src={logo1} alt=""></img>
                <img class="cict-logo" src={logo2} alt=""></img>
            </div>
            <div class="brand-container">
                <p id="bulsu-brand" className="navbar-brand">Bulacan State University</p>
                <p class="college-brand">College of Information and Communications Technology</p>
            </div>
        </nav>
    );
}
export default Navbar;