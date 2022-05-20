import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../static/Faculty_CompletionList.css";

function CompletionList() {
    const [faculty, setApproved] = useState([]);
    const [grades_value, setGrades] = useState(""); // handle grades input
    const [global_file, setFile] = useState("");

    useEffect(() => {
        axios.get(`/api/acceptedstudent`).then(res => {
            if (res.status === 200) {
                setApproved(res.data.accepted);
            }
        });
    }, []);

    const handleImage = (e) => {
        e.persist();
        e.preventDefault();
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setFile(reader.result);
        })
        reader.readAsDataURL(file);
    }

    const update = (e, id, name, student_id, faculty, reason, cys, e_signature) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        var remarks = "";

        if (parseFloat(grades_value) >= 1.00 && parseFloat(grades_value) <= 3.00) {
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
            status: "on process",
            cys: cys,
            grades_value: grades_value,
            remarks: remarks,
            e_sign_student: e_signature,
            e_sign_faculty: global_file,
        }

        axios.put(`/api/updated/${id}`, data).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Request Sent',
                    showConfirmButton: false,
                    timer: 1500
                })
                thisClicked.closest("tr").remove();
            }
        });
    }

    var approved_lists = "";

    approved_lists = faculty.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.student_id}</td>
                <td>{item.subject_code}</td>
                <td>{item.semester}</td>
                <td>{item.school_year}</td>
                <td>{item.reason}</td>
                <td>
                    <input type="file" name="esig" class="form-control" id="formFile" onChange={handleImage} />
                </td>
                <td>
                    <div class="input-group mb-3">
                        <select id='remarks' name={`remarks_${item.id}`} className="fa-remarks" value={grades_value} onChange={(e) => setGrades(e.target.value)} aria-label="Default select example">
                            <option value={'0'} disabled selected>Grades</option>
                            <option name={"grade100"} value={"1.00"}>{"1.00"}</option>
                            <option name={"grade125"} value={"1.25"}>{"1.25"}</option>
                            <option name={"grade150"} value={"1.50"}>{"1.50"}</option>
                            <option name={"grade175"} value={"1.75"}>{"1.75"}</option>
                            <option name={"grade200"} value={"2.00"}>{"2.00"}</option>
                            <option name={"grade225"} value={"2.25"}>{"2.25"}</option>
                            <option name={"grade250"} value={"2.50"}>{"2.50"}</option>
                            <option name={"grade275"} value={"2.75"}>{"2.75"}</option>
                            <option name={"grade300"} value={"3.00"}>{"3.00"}</option>
                            <option name={"grade500"} value={"5.00"}>{"5.00"}</option>
                        </select>
                    </div>
                </td>

                <td>
                    <button onClick={(e) => update(e, item.id, item.name, item.student_id, item.faculty, item.reason, item.cys, item.e_signature)} className="btn btn-success btn-sm">Send</button>
                </td>
            </tr>

        );
    });

    return (
        <div className="faculty-approved">
            <div className="fa-container-one">
                <div className="fa-title">
                    <ul>
                        <li className="fa-info" id="title">Submitted Completion List</li>
                    </ul>
                </div>
                <div className="fa-line"></div>
                <div className="fa-container-two">
                    <div className="fa-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Student ID</th>
                                    <th>Subject Code</th>
                                    <th>Semester/Trimester/Summer</th>
                                    <th>School Year</th>
                                    <th>Reason</th>
                                    <th>E-Signature</th>
                                    <th>Grades</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {approved_lists}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompletionList;