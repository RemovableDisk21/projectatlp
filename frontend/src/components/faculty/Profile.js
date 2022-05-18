import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../static/Faculty_Profile.css";

function Profile() {
    const history = useHistory();
    const [dashboardInput, setRegister] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("auth_id");
        axios.get(`/api/getprofile/${id}`).then(res => {
            if (res.status === 200) {
                console.log(res.data.profile);
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
            employee_id: dashboardInput.employee_id,
            number: dashboardInput.number,
            email: dashboardInput.email
        }

        const id = localStorage.getItem("auth_id");
        axios.put(`/api/faculty_profile/${id}`, data).then(res => {
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
        <div className="faculty-profile">
            <div className="fp-container-one">
                <div className="fp-container-two">
                    <form onSubmit={dashboardSubmit}>
                        <div className="fp-form">
                            <div className="fp-div">
                                <label className="fp-label" id="fp-label-id" >Fullname:</label>
                                <input className="fp-field" type="text" name="name" placeholder="Juan C. Dela Cruz" onChange={handleInput} value={dashboardInput.name} />
                            </div>
                            <div className="fp-div">
                                <label className="fp-label">Employee no:</label>
                                <input className="fp-field" type="text" name="employee_id" onChange={handleInput} value={dashboardInput.employee_id} readOnly />
                            </div>
                            <div className="fp-div">
                                <label className="fp-label">Contact no:</label>
                                <input className="fp-field" type="tel" name="number" maxLength="11" placeholder="0123 456 7890" onChange={handleInput} value={dashboardInput.number} />
                            </div>
                            <div className="fp-div">
                                <label className="fp-label">Email Address:</label>
                                <input className="fp-field" type="email" name="email" onChange={handleInput} value={dashboardInput.email} readOnly />
                            </div>
                            <div className="fp-div">
                                <input className="fp-btn" type="submit" value="Update Profile" id="btn-update" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;