import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { useState, useEffect } from "react";
function Request() {

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

                console.log(res.data.profile);
                setRegister(res.data.profile);

            }
        });
        axios.get(`/api/faculties`).then(res => {
            if (res.status === 200) {
                setFaculties(res.data.faculty)
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
        console.log(e.target.value);

    }
    const dashboardSubmit = (e) => {
        e.preventDefault();
        console.log(subject_code, semester, school_year);
        const data = {
            name: dashboardInput.name,
            student_id: dashboardInput.student_id,
            faculty: facultyInput,
            subject_code: subject_code,
            semester: semester,
            school_year: school_year,
            reason: dashboardInput.reason,
            hello: dashboardInput.hello,

        }
        console.log(data);
        const id = localStorage.getItem("auth_id");
        axios.post(`/api/requestform`, data).then(res => {
            if (res.data.status === 200) {

                swal(
                    'Good job!',
                    'Request Sent Contact your Faculty Externally!',
                    'success'
                )

            }
            else {
                setRegister({ ...dashboardInput, error_list: res.data.validation_error });
            }
        });

    }
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Request Form</h4>
                        </div >
                        <div className="card-body">
                            <form onSubmit={dashboardSubmit} >
                                <div className="form-group mb-3">
                                    <label>Full Name:</label>
                                    <input type="text" name="name" readOnly onChange={handleInput} value={dashboardInput.name} className="form-control" placeholder="first name" />
                                </div>
                                <div className="form-group mb-3">
                                    <div className="col-md-12"><label className="labels">Student ID:</label>
                                        <input type="text" readOnly name="student_id" onChange={handleInput} value={dashboardInput.student_id} className="form-control" placeholder="enter Student ID" />
                                    </div>

                                </div>

                                <label>Professor:</label>
                                <div class="input-group mb-3">
                                    <select id='faculty' name="faculty" value={facultyInput} onChange={handleinput} className="form-control" aria-label="Default select example">
                                        <option value={'0'}>Faculty:</option>
                                        {faculties.map((faculty, index) =>
                                            <option key={faculty.id} name={faculty.id} value={faculty.name}>{faculty.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="col-md-12"><label className="labels">Subject Code/Subject Name:</label><input type="text" name="subject_code" onChange={(e) => setSubjectCode(e.target.value)} value={subject_code} className="form-control" placeholder="enter Student ID" />  </div>
                                </div>
                                <div class="input-group mb-3">
                                    <div className="col-md-12"><label className="labels">Semester/Trimester/Summer:</label>
                                        <select id='semester' name="semester" value={semester} onChange={(e) => setSemester(e.target.value)} className="form-control" aria-label="Default select example">
                                            <option value={'0'}>SEMESTER</option>
                                            <option name="first" value={"First"}>First</option>
                                            <option name="second" value={"Second"}>Second</option>
                                            <option name="third" value={"Third"}>Third</option>
                                            <option name="summer" value={"Summer"}>Summer</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <div className="col-md-12">
                                        <label className="labels">School Year:</label>
                                        <input type="text" name="school_year" onChange={(e) => setSchoolYear(e.target.value)} value={school_year} className="form-control" placeholder="enter Student ID" />
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Reason for INCOMPLETE:</label>
                                    <input type="text" name="reason" onChange={handleInput} value={dashboardInput.reason} className="form-control" />
                                </div>

                                <div class="mb-3">
                                    <label for="formFile" class="form-label">E-signature</label>
                                    <input name="hello" class="form-control" onChange={handleInput} value={dashboardInput.hello} type="file" id="formFile" />
                                </div>


                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary ">Request</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default Request;