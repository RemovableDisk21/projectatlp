import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import "../../static/onprocess.css";
function ViewFaculty(props) {


    const [loading, setLoading] = useState(true);
    const [faculty, setStudents] = useState([]);
    const [dean, setDean] = useState([]);

    useEffect(() => {

        axios.get(`/api/onprocessed`).then(res => {
            if (res.status === 200) {
                setStudents(res.data.pending);
                setLoading(false);
            }
        });
        const id = localStorage.getItem("auth_id");
        axios.get(`/api/getprofile/${id}`).then(res => {
            if (res.status === 200) {
                setDean(res.data.profile);
            }
        });

    }, []);

    const update = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;

        const data = {
            id: id,
            status: "processed",
            dean: dean.name,
            e_sign_admin: dean.e_signature,
        }

        axios.put(`/api/processed/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal(
                    'Good job!',
                    'The form is completed!',
                    'success'
                )
                thisClicked.closest("tr").remove();

            }

        });
    }


    if (loading) {
        return <h4>Loading On Proccesed Form...</h4>
    }
    else {
        var faculty_HTMLTABLE = "";

        faculty_HTMLTABLE = faculty.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.student_id}</td>
                    <td>{item.subject_code}</td>
                    <td>{item.grades}</td>
                    <td className='text-center'>
                        <button id="send-btn" type="button" onClick={(e) => update(e, item.id)} className="btn send-btn btn-danger btn-sm">Process</button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div class="outer-container">
            <br />
            <h4 class="page-title">On Process Forms</h4>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Student ID</th>
                                            <th>Subject Code </th>
                                            <th>Remarks</th>
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
            </div>
        </div>
    );

}

export default ViewFaculty;