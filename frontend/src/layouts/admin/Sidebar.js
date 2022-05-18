import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {

    return(
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
             
                
   
                <div className="sb-sidenav-menu-heading">Form</div>
                <Link className="nav-link collapsed" to="/" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    Completion Form
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/admin/viewOnprocessed">On Proccesed Form</Link>
                        <Link className="nav-link" to="/admin/viewProcessed">Proccesed Form</Link>
                    </nav>
                </div>
                
                <Link className="nav-link collapsed" to="/" data-bs-toggle="collapse" data-bs-target="#collapseUser" aria-expanded="false" aria-controls="collapseUser">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    User List
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="collapseUser" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/admin/viewStudent">Student List</Link>
                        <Link className="nav-link" to="/admin/viewFaculties">Faculty List</Link>
                    </nav>
                </div>
                
                <Link className="nav-link" to="/admin/viewFaculty">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Pending Faculty
                </Link>
                
                     
                <Link className="nav-link" to="/admin/ViewDashboard">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Add Subject
                </Link>
                
                <Link className="nav-link" to="/admin/ViewFac">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Assign Faculty
                </Link>
                
            </div>
        </div>
        <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            Administrator
        </div>
    </nav>
    );
}

export default Sidebar;