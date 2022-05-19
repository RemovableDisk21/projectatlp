import React from 'react';
import { Link , useHistory} from 'react-router-dom';
import swal from "sweetalert";


const Sidebar = () => {
    const history = useHistory();
    const logoutSubmit = (e) =>{
        e.preventDefault();
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_name');
                    localStorage.removeItem('auth_role');
                    localStorage.removeItem('auth_status');
                    swal("Succes", "Logged out Succesfully!","success");
                    history.push('/login');
    }
    return(
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">

        <div className="sb-sidenav-menu">
            <div className="nav">
                <Link className="nav-link-side" to="/student/dashboard"><a>Profile</a></Link>

                <Link className="nav-link-side" to="/student/request"><a>Request Form</a></Link>
                
                <Link className="nav-link-side" to="/student/Formlist"><a>Requests</a></Link>

                <Link className="nav-link-side" onClick={logoutSubmit} ><a>Logout</a></Link>
            </div>
        </div>
        <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            <p>Student</p>
        </div>
    </nav>
    );
}

export default Sidebar;