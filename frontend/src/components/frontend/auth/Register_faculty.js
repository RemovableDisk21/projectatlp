import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "../../../layouts/frontend/Navbar";
import '../../../static/register.css';
import EmailJS from "emailjs-com";

function Register_Faculty() {
    const history = useHistory();
    const form = useRef();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [registerInput, setRegister] = useState({
        name: '',
        employee_id: '',
        email: '',
        password: '',
        error_list: [],
    });


    const handlePassword = (e) => {
        e.preventDefault();
        setConfirmPassword(e.target.value);
        if (confirmPassword.confirmPass != registerInput.password) {
            setConfirmError('Password does not match.');
            return false;
        } else {
            setConfirmError('');
            return true;
        }
    }

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }
    const registerSubmit = (e) => {
        e.preventDefault();
        let confirmPass = handlePassword;
        if (confirmPassword) {
            const data = {
                name: registerInput.name,
                employee_id: registerInput.employee_id,
                email: registerInput.email,
                password: registerInput.password,
            }
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post(`/api/register_faculty`, data).then(res => {
                    if (res.data.status === 200) {
                        localStorage.setItem('auth_token', res.data.token);
                        localStorage.setItem('auth_name', res.data.username);
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Register Successful',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        history.push('/login');
                        // EmailJS.sendForm(
                        //     "service_csfbmua", "template_ixxh3xd", form.current, "KA0rISbjAH9nNudt-"
                        // ).then(res => {
                        //     console.log(res);
                        // }).catch(err => console.log(err));
                    }
                    else {
                        setRegister({ ...registerInput, error_list: res.data.validation_error });
                    }
                });
            });
        }
    }


    return (
        <div>

            <Navbar />
            <div className="container">
                <div className="justify-content-center-cont-reg">
                    <div className="col-md-6">
                        <div class="reminder-container-register">
                            <h3>Reminder:</h3>
                            <p>When the time of completion exceeds one
                                semester, the request of the student for completion will be automatically “expired” and will be archived.</p>
                        </div>
                        <div className="card" class="register_container">
                            <h4 class="reg_head">FACULTY REGISTER</h4>
                            <div className="card-body">
                                <form ref={form} onSubmit={registerSubmit}>
                                    <input type="hidden" name="message" value="Your registration to the Completion of Grades System as a Faculty was successful. Unfortunately, your account has not yet been verified. Please be patient while the administrator is verifying your information. 
"/>
                                    <input type="hidden" name="status" value="Pending" />
                                    <div className="form-group mb-3">
                                        <label class="labelers">Full Name:</label>
                                        <input type="" name="name" onChange={handleInput} value={registerInput.name} className="form-control" />
                                        <span>{registerInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label class="labelers">Employee ID:</label>
                                        <input type="" name="employee_id" onChange={handleInput} value={registerInput.employee_id} className="form-control" />
                                        <span>{registerInput.error_list.employee_id}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label class="labelers">Email Address:</label>
                                        <input type=" " name="email" onChange={handleInput} value={registerInput.email} className="form-control" />
                                        <span>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label class="labelers">Password:</label>
                                        <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" />
                                        <span>{registerInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label class="labelers">Confirm Password:</label>
                                        <input type="password" name="c_password" onChange={handlePassword} value={confirmPassword} className="form-control" />
                                        <span>{confirmError}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                    <Link className="nav-link login" to="/login">Already have a account? Click here</Link>
                                    <Link className="nav-link student" to="/register">Register as Student</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Register_Faculty;