import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../static/Faculty_Profile.css";

function Profile() {
    const [dashboardInput, setRegister] = useState([]);
    const [e_signature, setSignature] = useState("");
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

    const updateProfile = (e) => {
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

    const handleImage = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setSignature(reader.result);

        })
        reader.readAsDataURL(file);
    }

    const updateSignature = (e) => {
        e.preventDefault();
        const data = {
            e_signature: e_signature,
        }

        const id = localStorage.getItem("auth_id");
        axios.put(`/api/student_signature/${id}`, data).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Signature Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else {
                setSignature({ e_signature, error_list: res.data.validation_error });
            }
        });
    }

    return (
        <div className="faculty-profile">
            <div className="fp-container-one">
                <div className="fp-title">
                    <ul>
                        <li className="fp-info" id="title">Faculty Profile</li>
                    </ul>
                </div>
                <div className="fp-container-two">
                    <div className="fp-form">
                        <form onSubmit={updateProfile}>
                            <div className="fp-div">
                                <label className="fp-label" id="fp-label-id" >Fullname:</label>
                                <input className="fp-field" type="text" name="name" placeholder="Juan C. Dela Cruz" onChange={handleInput} value={dashboardInput.name} />
                            </div>
                            <div className="fp-div">
                                <label className="fp-label">Employee No:</label>
                                <input className="fp-field" type="text" name="employee_id" onChange={handleInput} value={dashboardInput.employee_id} disabled readOnly />
                            </div>
                            <div className="fp-div">
                                <label className="fp-label">Contact No:</label>
                                <input className="fp-field" type="tel" name="number" maxLength="11" placeholder="0123 456 7890" onChange={handleInput} value={dashboardInput.number} />
                            </div>
                            <div className="fp-div">
                                <label className="fp-label">Email Address:</label>
                                <input className="fp-field" type="email" name="email" onChange={handleInput} value={dashboardInput.email} disabled readOnly />
                            </div>
                            <div className="fp-div">
                                <input className="fp-btn" type="submit" value="Update Profile" id="btn-update" />
                            </div>
                        </form>
                        <form onSubmit={updateSignature}>
                            <div className="fp-div" id="updateSig">
                                <label className="fp-label">E-Signature:</label>
                                    <input type="file" id="esig" name="esig" class="form-control" onChange={handleImage} />
                                <div className="fp-div">
                                    <input className="fp-btn" type="submit" value="Update Signature" id="btn-update-sig" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;