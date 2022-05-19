import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from 'axios';
import swal from 'sweetalert';
import '../../../static/login.css';
function Login()
{

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
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    swal("Succes", res.data.message, "success");
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_id', res.data.id);
                    localStorage.setItem('auth_role', res.data.role);
                    localStorage.setItem('auth_status', res.data.user_status);

                    if (res.data.role === "faculty" && res.data.user_status == "pending") {
                        swal(
                            'Oops...',
                            'Something went wrong!',
                            'error'
                        )


                    } else if (res.data.role === "student") {
                        swal("Succes", res.data.message, "success");
                        history.push('/student/dashboard');
                    }
                    else if (res.data.role === "faculty" && res.data.user_status == "accepted") {
                        swal("Succes", res.data.message, "success");
                        history.push('/faculty/profile');
                    }
                }
                else {
                    setLogin({ ...loginInput, error_list: res.data.validation_error });
                }
            });
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container py-5">
            <div className="row justify-content-center">

                <div className="col-md-6">
                    <div className="card" class="login_container">
                        <h4 class="login_head">LOGIN</h4>
                        <div className="card-body">
                            <form onSubmit={loginSubmit}>
                                <div className="form-group mb-3">
                                    <label class="labelers">Email Address:</label>
                                    <input type ="email" name ="email" onChange={handleInput} value = {loginInput.email} className = "form-control inputters" />
                                </div>
                                <div className="form-group mb-3">
                                    <label class="labelers">Password:</label>
                                    <input type ="password" name ="password" onChange={handleInput} value = {loginInput.password} className = "form-control inputters"  />
                                </div>
                                

                                <div className="form-group mb-3">
                                    <button type="submit"className="btn btn-primary">Login</button>
                                </div>
                                <Link className="nav-link admin" to="/login_admin">Login as Administrator? Click here</Link>
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