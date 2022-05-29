import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../static/Faculty_CompletionList.css";
import EmailJS, { send } from 'emailjs-com';

function CompletionList() {
    const form = useRef();
    const [faculty, setApproved] = useState([]);
    const [grades_value, setGrades] = useState(""); // handle grades input
    const [facultySignature, setSignature] = useState("");
    const [remark, setRemark] = useState("");

    useEffect(() => {
        axios.get(`/api/pendingstudent`).then(res => {
            if (res.status === 200) {
                setApproved(res.data.pending);
            }
        });
        const id = localStorage.getItem("auth_id");
        axios.get(`/api/getprofile/${id}`).then(res => {
            if (res.status === 200) {
                setSignature(res.data.profile);
            }
        });
    }, []);
    const update = (e, id, name, student_id, faculty, reason, cys, e_signature, student_email) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        var remarks = "";

        if (parseFloat(grades_value) >= 1.00 && parseFloat(grades_value) <= 3.00) {
            remarks = "PASSED";
            setRemark("Passed");
        }
        else {
            remarks = "FAILED";
            setRemark("Failed");
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
            e_sign_faculty: facultySignature.e_signature,
            student_email: student_email,
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
                // EmailJS.sendForm(
                //     'service_90b52vb',
                //     'template_vmf692c',
                //     form.current,
                //     'gR-Bu8Ulwy3mhhNmG').then(res => {
                //         console.log(res);
                //     }).catch(err => console.log(err));

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
                    <div class="input-group mb-3">
                        <select id='remarks' name="grades" className="fa-remarks" value={grades_value} onChange={(e) => setGrades(e.target.value)} aria-label="Default select example">
                            <option value={'0'} selected>Grades</option>
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
                    <form ref={form}>
                        <input className="sr-field" type="hidden" name="to_email" value={item.student_email} />
                        <input className="sr-field" type="hidden" name="subject_code" value={item.subject_code} />
                        <input className="sr-field" type="hidden" name="status" value={'On Process'} />
                        <input className="sr-field" type="hidden" name="remarks" value={remark} onChange={setRemark} />
                        <input className="sr-field" type="hidden" name="grade" value={grades_value} onChange={setGrades} />
                        <input className="sr-field" type="hidden" name="receiver" value={"the Office of the Dean"} />
                    </form>
                    <button type="submit" onClick={(e) => update(e, item.id, item.name, item.student_id, item.faculty, item.reason, item.cys, item.e_signature, item.student_email)} className="btn btn-success btn-sm">Send</button>
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