import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../static/Student_Profile.css";

function Profile() {
    const [profile_data, setUpdates] = useState([]);
    const [e_signature, setSignature] = useState("");

    useEffect(() => {
        const id = localStorage.getItem("auth_id");
        axios.get(`/api/getprofile/${id}`).then(res => {
            if (res.status === 200) {
                setUpdates(res.data.profile);
            }
        });

    }, []);

    const profile_inputs = (e) => {
        e.persist();
        setUpdates({ ...profile_data, [e.target.name]: e.target.value });
    }

    const updateProfile = (e) => {
        e.preventDefault();
        const data = {
            name: profile_data.name,
            student_id: profile_data.student_id,
            course: profile_data.course,
            year: profile_data.year,
            section: profile_data.section,
            number: profile_data.number,
            email: profile_data.email,
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
                setUpdates({ ...profile_data, error_list: res.data.validation_error });
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
        <div className="student-profile">
            <div className="sp-container-one">
                <div className="sp-title">
                    <ul>
                        <li className="sp-info" id="title">Student Profile</li>
                    </ul>
                </div>
                <div className="sp-container-two">
                    <div className="sp-form">
                        <form onSubmit={updateProfile}>
                            <div className="sp-div">
                                <label className="sp-label" id="sp-label-id" >Fullname:</label>
                                <input className="sp-field" type="text" name="name" placeholder="Juan C. Dela Cruz" onChange={profile_inputs} value={profile_data.name} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Student no:</label>
                                <input className="sp-field" type="text" name="employee_id" onChange={profile_inputs} value={profile_data.student_id} disabled readOnly />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Course:</label>
                                <input className="sp-field" type="text" name="course" onChange={profile_inputs} value={profile_data.course} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Year:</label>
                                <input className="sp-field" type="text" name="year" onChange={profile_inputs} value={profile_data.year} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Section:</label>
                                <input className="sp-field" type="text" name="section" onChange={profile_inputs} value={profile_data.section} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Contact no:</label>
                                <input className="sp-field" type="tel" name="number" maxLength="11" onChange={profile_inputs} value={profile_data.number} />
                            </div>
                            <div className="sp-div">
                                <label className="sp-label">Email Address:</label>
                                <input className="sp-field" type="email" name="email" onChange={profile_inputs} value={profile_data.email} disabled readOnly />
                            </div>
                            <div className="sp-div">
                                <input className="sp-btn" type="submit" value="Update Profile" id="btn-update" />
                            </div>
                        </form>
                        <form onSubmit={updateSignature}>
                            <div className="sp-div" id="updateSig">
                                <label className="sp-label">E-Signature:</label>
                                    <input type="file" id="esig" name="esig" class="form-control" onChange={handleImage} />
                                <div className="sp-div">
                                    <input className="sp-btn" type="submit" value="Update Signature" id="btn-update-sig" />
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