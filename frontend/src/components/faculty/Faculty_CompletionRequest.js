import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../static/Faculty_CompletionRequest.css";

function CompletionRequest(props) {
    const [loading, setLoading] = useState(true);
    const [faculty, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`/api/pendingstudent`).then(res => {
            if (res.status === 200) {
                setStudents(res.data.pending)
                setLoading(false);
            }
        });

    }, []);

    const acceptRequest = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        const data = {
            status: "accepted",
        }

        axios.put(`/api/updating/${id}`, data).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Request Accepted!',
                    showConfirmButton: false,
                    timer: 1500
                })
                thisClicked.closest("tr").remove();
            }
        });
    }

    const declineRequest = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-students/${id}`).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Request Declined!',
                    showConfirmButton: false,
                    timer: 1500
                })
                thisClicked.closest("tr").remove();
            }

            else if (res.data.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something went wrong!',
                })
                thisClicked.innerText = "Delete";
            }
        });
    }

    var faculty_HTMLTABLE = "";

    faculty_HTMLTABLE = faculty.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.student_id}</td>
                <td>{item.subject_code}</td>
                <td>{item.semester}</td>
                <td>{item.school_year}</td>
                <td>{item.status}</td>

                <td className='text-center'>
                    <button onClick={(e) => acceptRequest(e, item.id)} className="btn btn-success btn-sm btn-confirm">Accept</button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" onClick={(e) => declineRequest(e, item.id)} className="btn btn-danger btn-sm btn-decline">Decline</button>
                </td>
            </tr>
        );
    });

    return (
        <div className="faculty-request">
            <div className="fr-title">
                <ul>
                    <li className="fr-info" id="title">Student Completion Request/s</li>
                </ul>
            </div>
            <div className="fr-line"></div>
            <div className="fr-container-one">
                <div className="fr-container-two">
                    <div className="fr-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Student ID</th>
                                    <th>Subject Code</th>
                                    <th>Semester/Trimester/Summer</th>
                                    <th>School Year</th>
                                    <th>Status</th>
                                    <th className='text-center'>Action</th>
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
    );
}

export default CompletionRequest;