import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../static/login.css';

function Login() {
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
        if (loginInput.email === 'admin') {
            loginInput.email = 'admin@example.com';
        }
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register_admin`).then(res => {
                if (res.data.status === 200) {
                    console.log('Registered');
                }
            });
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_id', res.data.id);
                    localStorage.setItem('auth_role', res.data.role);
                    localStorage.setItem('auth_status', res.data.user_status);

                    if (res.data.role === "faculty" && res.data.user_status == "pending") {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'warning',
                            title: 'Verification Required',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Login Successful',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        if (res.data.role === "faculty" && res.data.user_status == "accepted") {
                            history.push('/faculty/Profile');
                        }
                        else if (res.data.role === "student") {
                            history.push('/student/Profile');
                        }
                        else if (res.data.role === "admin") {
                            history.push('/admin/Admin_Department_Information');
                        }
                    }
                }
                else {
                    setLogin({ ...loginInput, error_list: res.data.validation_error });
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Invalid Credentials',
                        text: 'Email or Password is incorrect.',
                        showConfirmButton: true,
                    })
                }
            });
        });
    }

    return (
        <div class="peep">
            <Navbar />
            <div className="container">
                <div className="justify-content-center-cont">

                    <div className="col-md-6">
                        <div className="card" class="login_container">
                            <h4 class="login_head">LOGIN</h4>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>
                                    <div className="form-group mb-3">
                                        <label class="labelers email">Email Address:</label>
                                        <input type="text" name="email" onChange={handleInput} value={loginInput.email} className="form-control inputters" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label class="labelers pass">Password:</label>
                                        <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control inputters" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
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

export default Login;