import React from 'react';
import { Link , useHistory} from 'react-router-dom';
import Swal from "sweetalert2";
import icon from "../../static/images/admin-icon.png";
import "../../static/navigation.css";

const Sidebar = () => {
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

    return(
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sidenav-icon-container">
                <img class="icon" src={icon}></img>
                <div class="sidenav-log-container">
                    <p class="log-status">Administrator</p>
                </div>
            </div>
        <div className="sb-sidenav-menu">
            <div className="nav">
                <Link className="nav-link-side" to="/admin/Admin_Department_Information"><a>Department Information</a></Link>
                <Link className="nav-link-side" to="/admin/Admin_ProcessForms"><a>On Process Forms</a></Link>
                <Link className="nav-link-side" to="/admin/Admin_FinishedForms"><a>Finished Forms</a></Link>
                <Link className="nav-link-side" to="/admin/Admin_StudentList"><a>Student List</a></Link>
                <Link className="nav-link-side" to="/admin/Admin_FacultyList"><a>Faculty List</a></Link>
                <Link className="nav-link-side" to="/admin/Admin_PendingFaculty"><a>Pending Faculty</a></Link>
                <Link className="nav-link-side" onClick={logoutSubmit} ><a>Logout</a></Link>
            </div>
        </div>
    </nav>
    );
}

export default Sidebar;