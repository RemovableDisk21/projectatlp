import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useParams } from "react-router-dom";
function ViewFaculty(props) {

    const [dashboardInput, setRegister] = useState([]);
    const [loading, setLoading] = useState(true);
    const [faculty, setStudents] = useState([]);
    const [studentInput, setStudent] = useState([]); //axios.get
    const [facultyInput, setFaculty] = useState(""); //handleInput
    const [subjectInput, setSubject] = useState([]); //axios.get


    useEffect(() => {

        axios.get(`/api/acceptedstudent`).then(res => {
            if (res.status === 200) {
                setStudents(res.data.accepted)
                setLoading(false);
            }
        });

        axios.get(`/api/assignremarks`).then(res => {
            if (res.status === 200) {
                setStudent(res.data.subject)
                // setLoading(false);
            }
        });

    }, []);

    const handleinput = (e) => {
        e.persist();
        e.preventDefault();

        setFaculty(e.target.value);
    }

    const update = (e, id, name, student_id, faculty, reason) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        var remarks = "";
        if (parseFloat(facultyInput) >= 1.00 && parseFloat(facultyInput) <= 3.00) {
            remarks = "PASSED";
        }
        else {
            remarks = "FAILED";
        }
        const data = {
            id: id,
            name: name,
            faculty: faculty,
            student_id: student_id,
            reason: reason,
            status: "onprocess",
            facultyInput: facultyInput,
            remarks: remarks,

        }

        axios.put(`/api/updated/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal(
                    'Good job!',
                    'Your work here is done!',
                    'success'
                )

                thisClicked.closest("tr").remove();

            }

        });

    }
    const deleteStudent = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-faculty/${id}`).then(res => {
            if (res.data.status === 200) {
                swal(
                    'Oops...',
                    'Decline Student Request!',
                    'error'
                )
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    if (loading) {
        return <h4>Loading Student List Data...</h4>
    }
    else {
        var faculty_HTMLTABLE = "";

        faculty_HTMLTABLE = faculty.map((item, index) => {
            return (

                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.student_id}</td>
                    <td>{item.semester}</td>
                    <td>{item.school_year}</td>
                    <td>{item.faculty}</td>
                    <td>{item.reason}</td>
                    <div class="mb-3">

                        <input name="hello" class="form-control" onChange={handleinput.hello} type="file" id="formFile" />

                    </div>

                    <td><div class="input-group mb-3">
                        <select id='remarks' name="remarks" value={facultyInput} onChange={handleinput} className="form-control" aria-label="Default select example">
                            <option value={'0'}>Grades:</option>

                            {studentInput.map((faculty, index) =>

                                <option key={faculty.id} name={faculty.id} value={faculty.value}>{faculty.value}</option>

                            )}

                        </select>
                    </div></td>

                    <td><button onClick={(e) => update(e, item.id, item.name, item.student_id, item.faculty, item.reason)} className="btn btn-success btn-sm">Send</button></td>


                </tr>

            );
        });

    }


    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">

                                <h4>Approved Form Data

                                </h4>
                            </div>
                            <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Student ID:</th>
                                            <th>subject code:</th>
                                            <th>Semester/Trimester/Summer</th>
                                            <th>School Year</th>
                                            <th>reason:</th>




                                            <th>E- Signature</th>
                                            <th>Grades  </th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {faculty_HTMLTABLE}

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ViewFaculty;