import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function StudentList(props) {
    const [faculty, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`/api/student`).then(res => {
            if (res.status === 200) {
                setStudents(res.data.pending)
            }
        });

    }, []);

    const deleteStudent = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Confirm Delete',
            text: "Are you sure you want to delete this account?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/delete-faculty/${id}`).then(res => {
                    if (res.data.status === 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Account Deleted',
                            text: 'Student account has been deleted.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        thisClicked.closest("tr").remove();
                    }
                });
            }
        })
    }

    var faculty_HTMLTABLE = "";
    faculty_HTMLTABLE = faculty.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.student_id}</td>
                <td>{item.email}</td>
                <td className='text-center'>
                    <button id="remove-btn" type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger remove-btn btn-sm">Remove</button>
                </td>
            </tr>
        );
    });

    return (
        <div class="outer-container">
            <br />
            <h4 class="page-title">Student List</h4>
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
                                            <th>Email Address</th>
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

export default StudentList;