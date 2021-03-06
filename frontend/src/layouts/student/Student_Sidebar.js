import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import icon from "../../static/images/student-icon.png";
import "../../static/navigation.css";

const Student_Sidebar = () => {
    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        localStorage.removeItem('auth_role');
        localStorage.removeItem('auth_status');

        Swal.fire({
            title: 'Confirm Log Out',
            text: "Are you sure you want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                history.push('/login');
            }
        })
    }

    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sidenav-icon-container">
                <img class="icon" src={icon}></img>
                <div class="sidenav-log-container">
                    <p class="log-status">Student</p>
                </div>
            </div>
            
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <Link className="nav-link-side" to="/student/Profile"><a>Profile</a></Link>
                    <Link className="nav-link-side" to="/student/RequestForm"><a>Request Form</a></Link>
                    <Link className="nav-link-side" to="/student/RequestList"><a>Request List</a></Link>
                    <Link className="nav-link-side" onClick={logoutSubmit} ><a>Logout</a></Link>
                </div>
            </div>
        </nav>
    );
}

export default Student_Sidebar;