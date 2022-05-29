import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "../../../layouts/frontend/Navbar";
import '../../../static/login.css';

function Logins() {
    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        const newdata = {
            email: loginInput.email + "@example.com",
            password: loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register_admin`, newdata).then(res => {
                if (res.data.status === 200) {
                    console.log('Registered');
                }
            });
            axios.post(`api/login`, newdata).then(res => {
                if (res.data.status === 200) {
                    console.log('Welcome Admin');
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_id', res.data.id);
                    localStorage.setItem('auth_role', res.data.role);

                    axios.post(`/api/admin_login`, data).then(res => {
                        if (res.data.status === 200) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Login Successful',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            history.push('/admin/Department_Information');
                        }
                        else {
                            setLogin({ ...loginInput, error_list: res.data.validation_error });
                        }
                    });
                }
            });
        });
    }
    return (
        <div>

            <Navbar />
            <div className="container">
                <div className="justify-content-center-cont">
                    <div className="col-md-6">
                        <div className="card" class="login_container">
                            <h4 class="login_head">ADMIN LOGIN</h4>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>
                                    <div className="form-group mb-3">
                                        <label class="labelers email">Username:</label> &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
                                        <input type=" " name="email" onChange={handleInput} value={loginInput.email} className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label class="labelers pass">Password:</label>
                                        <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary login-buttoners">Login</button>
                                    </div>
                                    <Link className="nav-link admin" to="/login">Not an Administrator? Click here</Link>
                                </form>
                            </div>
                        </div>
                        <div class="reminder-container">
                            <h3>Reminder:</h3>
                            <p>When the time of completion exceeds one
                                semester, the request of the student for completion will be automatically “expired” and will be archived.</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Logins;