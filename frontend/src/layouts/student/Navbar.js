import axios from "axios";
import React from "react";
import { Link , useHistory} from "react-router-dom";
import swal from "sweetalert";
import logo1 from "../../static/images/bulsu.png";
import logo2 from "../../static/images/cict.png";
import "../../static/header.css";

const Navbar = () => {
const history = useHistory();
const logoutSubmit = (e) =>{
    e.preventDefault();

    axios.post(`/api/logout`).then(res =>{
        if(res.data.status === 200)
        {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Succes", res.data.message,"success");
                history.push('/login');
        }
    });
}

    return(
        <nav id="navbarrer" className="sb-topnav navbar navbar-expand navbarrer navbar-expand navbar-dark bg-dark">

                <div class="logo-container">
                    <img class="bulsu-logo" src={logo1} alt=""></img>
                    <img class="cict-logo" src={logo2} alt=""></img>
                </div>

                <div class="brand-container">
                    <Link id="bulsu-brand" className="navbar-brand" to="/">Bulacan State University</Link>
                    <p class="college-brand">College of Information and Communications Technology</p>
                </div>
        </nav> 
    );
}

export default Navbar;