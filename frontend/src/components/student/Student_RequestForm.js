import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../static/Student_RequestForm.css";

function RequestForm() {
    const [dashboardInput, setRegister] = useState([]);
    const [facultyInput, setFaculty] = useState(""); //handleInput
    const [faculties, setFaculties] = useState([]); //handleInput
    const [subject_code, setSubjectCode] = useState(""); //handleInput
    const [semester, setSemester] = useState(""); //handleInput
    const [school_year, setSchoolYear] = useState(""); //handleInput

    useEffect(() => {
        const id = localStorage.getItem("auth_id");
        axios.get(`/api/getprofile/${id}`).then(res => {
            if (res.status === 200) {
                setRegister(res.data.profile);
            }
        });
        axios.get(`/api/faculties`).then(res => {
            if (res.status === 200) {
                setFaculties(res.data.faculty);
            }
        });
    }, []);

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...dashboardInput, [e.target.name]: e.target.value });
    }

    const handleinput = (e) => {
        e.persist();
        e.preventDefault();
        setFaculty(e.target.value);
    }
    const dashboardSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: dashboardInput.name,
            student_id: dashboardInput.student_id,
            faculty: facultyInput,
            subject_code: subject_code,
            semester: semester,
            school_year: school_year,
            reason: dashboardInput.reason,
            cys: `${dashboardInput.course}/${dashboardInput.year}${dashboardInput.section}`,
            esig: dashboardInput.e_signature,
        }

        const id = localStorage.getItem("auth_id");
        axios.post(`/api/requestform`, data).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Request Sent',
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
        <div className="student-request">
            <div className="sr-container-one">
                <div className="sr-title">
                    <ul>
                        <li className="sr-info" id="title">Request Form</li>
                    </ul>
                </div>
                <div className="sr-container-two">
                    <form onSubmit={dashboardSubmit}>
                        <div className="sr-form">
                            <div className="sr-div">
                                <label className="sr-label" id="sr-label-id" >Fullname:</label>
                                <input className="sr-field" type="text" name="name" placeholder="Juan C. Dela Cruz" onChange={handleInput} value={dashboardInput.name} disabled readOnly />
                            </div>
                            <div className="sr-div">
                                <label className="sr-label">Student no:</label>
                                <input className="sr-field" type="text" name="student_id" onChange={handleInput} value={dashboardInput.student_id} disabled readOnly />
                            </div>
                            <div className="sr-div">
                                <label className="sr-label">Professor:</label>
                                <select className="sr-select" id='faculty' name="faculty" value={facultyInput} onChange={handleinput} aria-label="Default select example">
                                    <option value={'0'}>Faculty</option>
                                    {faculties.map((faculty, index) =>
                                        <option key={faculty.id} name={faculty.id} value={faculty.name}>{faculty.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="sr-div">
                                <label className="sr-label">Subject Code/Subject Name:</label>
                                <input className="sr-field" type="text" name="subject_code" onChange={(e) => setSubjectCode(e.target.value)} value={subject_code} />
                            </div>
                            <div className="sr-div">
                                <label className="sr-label">Semester/Trimester/Summer:</label>
                                <select className="sr-select" id='semester' name="semester" value={semester} onChange={(e) => setSemester(e.target.value)} aria-label="Default select example">
                                    <option value={'0'}>SEMESTER</option>
                                    <option name="first" value={"First"}>First</option>
                                    <option name="second" value={"Second"}>Second</option>
                                    <option name="third" value={"Third"}>Third</option>
                                    <option name="summer" value={"Summer"}>Summer</option>
                                </select>
                            </div>
                            <div className="sr-div">
                                <label className="sr-label">School Year:</label>
                                <input className="sr-field" type="text" name="school_year" onChange={(e) => setSchoolYear(e.target.value)} value={school_year} />
                            </div>
                            <div className="sr-div">
                                <label className="sr-label">Reason for INCOMPLETE:</label>
                                <input className="sr-field" type="text" name="reason" onChange={handleInput} value={dashboardInput.reason} />
                            </div>
                            <div className="sr-div">
                                <input className="sr-btn" type="submit" value="Request" id="btn-req" />
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default RequestForm;