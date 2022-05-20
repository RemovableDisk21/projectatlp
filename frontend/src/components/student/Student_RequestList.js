import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import "../../static/Student_RequestList.css";

function RequestList(props) {
    const [loading, setLoading] = useState(true);
    const [pending, setStudents] = useState([]);
    const [forms, setForms] = useState([]);

    useEffect(() => {

        axios.get(`/api/onprocessed`).then(res => {
            if (res.status === 200) {
                setForms(res.data.pending)
                setLoading(false);
            }
        });

        axios.get(`/api/pendingstudent`).then(res => {
            if (res.status === 200) {
                setStudents(res.data.pending)
                setLoading(false);
            }
        });

    }, []);


    const update = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        // const student_id = props.match.params.id;
        // const data = studentInput;
        const data = {
            status: "accepted",

        }

        axios.put(`/api/update/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success!", res.data.message, "success")
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
                swal("Deleted!", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    var request_table = "";
    var request_pending = "";

    request_table = forms.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.student_id}</td>
                <td>{item.faculty}</td>
                <td>{item.subject_code}</td>
                <td>{item.semester}</td>
                <td>{item.school_year}</td>
                <td>{item.reason}</td>
                <td>{item.grades}</td>
                <td>{item.remarks}</td>
                <td>{item.status}</td>
            </tr>
        );
    });

    request_pending = pending.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.student_id}</td>
                <td>{item.faculty}</td>
                <td>{item.subject_code}</td>
                <td>{item.semester}</td>
                <td>{item.school_year}</td>
                <td>{item.reason}</td>
                <td>{item.grades}</td>
                <td>{item.remarks}</td>
                <td>{item.status}</td>
            </tr>
        );
    });

    return (
        <div className="student-formlist">
            <div className="sf-container-one">
                <div className="sf-title">
                    <ul>
                        <li className="sf-info" id="title">Student Form List/s</li>
                    </ul>
                </div>
                <div className="sf-line"></div>
                <div className="sf-container-two">
                    <div className="sf-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Student ID</th>
                                    <th>Faculty Name</th>
                                    <th>Subject Code/
                                        Subject Name</th>
                                    <th>Semester/
                                        Trimester/Summer</th>
                                    <th>School Year</th>
                                    <th>Reason for Incomplete</th>
                                    <th>Grade</th>
                                    <th>Remarks</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {request_table}
                                {request_pending}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestList;