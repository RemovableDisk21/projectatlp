import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../static/Admin_CollegeInfo.css";

function Profile() {
    const [dashboardInput, setRegister] = useState([]);
    const [e_signature, setSignature] = useState("");
    useEffect(() => {
        const id = localStorage.getItem("auth_id");
        axios.get(`/api/getprofile/${id}`).then(res => {
            if (res.status === 200) {
                setRegister(res.data.profile);
                console.log(dashboardInput);
            }
        });

    }, []);

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...dashboardInput, [e.target.name]: e.target.value });
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
            dean: dashboardInput.name,
            e_signature: e_signature,
        }

        const id = localStorage.getItem("auth_id");
        axios.put(`/api/admin_signature/${id}`, data).then(res => {
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
        <div className="admin_department">
            <div className="di-container-one">
                <div className="di-title">
                    <ul>
                        <li className="di-info" id="title">Department Information</li>
                    </ul>
                </div>
                <div className="di-container-two">
                    <div className="di-form">
                        <form onSubmit={updateSignature}>
                            <div className="di-div">
                                <label className="di-label" id="di-label-id" >Dean's Full Name:</label>
                                <input className="di-field" type="text" name="name" placeholder="Juan C. Dela Cruz" onChange={handleInput} value={dashboardInput.name} />
                            </div>
                            <div className="di-div" id="updateSig">
                                <label className="di-label">E-Signature:</label>
                                    <input type="file" id="esig" name="esig" class="form-control" onChange={handleImage} />
                                <div className="di-div">
                                    <input className="di-btn" type="submit" value="Update Signature" id="btn-update-sig" />
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