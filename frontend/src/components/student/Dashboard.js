import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../static/Student_Profile.css";

function Dashboard() {
    const [dashboardInput, setRegister] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("auth_id");
        axios.get(`/api/getprofile/${id}`).then(res => {
            if (res.status === 200) {
                setRegister(res.data.profile);
            }
        });

    }, []);

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...dashboardInput, [e.target.name]: e.target.value });
    }

    const dashboardSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: dashboardInput.name,
            student_id: dashboardInput.student_id,
            course: dashboardInput.course,
            year: dashboardInput.year,
            section: dashboardInput.section,
            number: dashboardInput.number,
            email: dashboardInput.email,
        }

        const id = localStorage.getItem("auth_id");
        axios.put(`/api/student_profile/${id}`, data).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Profile Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else {
                setRegister({ ...dashboardInput, error_list: res.data.validation_error });
            }
        });

    }

    return (
        <div className="student-profile">
            <div className="sp-container-one">
                <div className="sp-title">
                    <ul>
                        <li className="sp-info" id="title">Student Profile</li>
                    </ul>
                </div>
                <div className="sp-container-two">
                    <form onSubmit={dashboardSubmit}>
                        <div className="sp-form">
                            <div className="sp-div">
                                <label className="sp-label" id="sp-label-id" >Fullname:</label>
                                <input className="sp-field" type="text" name="name" placeholder="Juan C. Dela Cruz" onChange={handleInput} value={dashboardInput.name} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Student no:</label>
                                <input className="sp-field" type="text" name="employee_id" onChange={handleInput} value={dashboardInput.student_id} disabled readOnly />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Course:</label>
                                <input className="sp-field" type="text" name="course" onChange={handleInput} value={dashboardInput.course} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Year:</label>
                                <input className="sp-field" type="text" name="year" onChange={handleInput} value={dashboardInput.year} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Section:</label>
                                <input className="sp-field" type="text" name="section" onChange={handleInput} value={dashboardInput.section} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Contact no:</label>
                                <input className="sp-field" type="tel" name="number" maxLength="11" onChange={handleInput} value={dashboardInput.number} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Email Address:</label>
                                <input className="sp-field" type="email" name="email" onChange={handleInput} value={dashboardInput.email} disabled readOnly />
                            </div>
                            <div className="sp-div">
                                <input className="sp-btn" type="submit" value="Update Profile" id="btn-update" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;