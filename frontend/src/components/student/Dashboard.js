import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../static/Student_Profile.css";

function Dashboard() {
    const [profile_updates, setUpdates] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("auth_id");
        axios.get(`/api/getprofile/${id}`).then(res => {
            if (res.status === 200) {
                setUpdates(res.data.profile);
            }
        });

    }, []);

    const handleInput = (e) => {
        e.persist();
        setUpdates({ ...profile_updates, [e.target.name]: e.target.value });
    }

    const dashboardSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: profile_updates.name,
            student_id: profile_updates.student_id,
            course: profile_updates.course,
            year: profile_updates.year,
            section: profile_updates.section,
            number: profile_updates.number,
            email: profile_updates.email,
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
                setUpdates({ ...profile_updates, error_list: res.data.validation_error });
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
                                <input className="sp-field" type="text" name="name" placeholder="Juan C. Dela Cruz" onChange={handleInput} value={profile_data.name} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Student no:</label>
                                <input className="sp-field" type="text" name="employee_id" onChange={handleInput} value={profile_data.student_id} disabled readOnly />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Course:</label>
                                <input className="sp-field" type="text" name="course" onChange={handleInput} value={profile_data.course} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Year:</label>
                                <input className="sp-field" type="text" name="year" onChange={handleInput} value={profile_data.year} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Section:</label>
                                <input className="sp-field" type="text" name="section" onChange={handleInput} value={profile_data.section} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Contact no:</label>
                                <input className="sp-field" type="tel" name="number" maxLength="11" onChange={handleInput} value={profile_data.number} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Email Address:</label>
                                <input className="sp-field" type="email" name="email" onChange={handleInput} value={profile_data.email} disabled readOnly />
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