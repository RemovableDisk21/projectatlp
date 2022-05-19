import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useParams } from "react-router-dom";
function ViewFaculty(props) {


    const [loading, setLoading] = useState(true);
    const [faculty, setStudents] = useState([]);

    useEffect(() => {

        axios.get(`/api/onprocessed`).then(res => {
            if (res.status === 200) {
                setStudents(res.data.pending);
                setLoading(false);
            }
        });

    }, []);


    const update = (e, id,) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        console.log(id);

        const data = {
            id: id,
            status: "processed",

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
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.student_id}</td>
                    <td>{item.subject_code}</td>
                    <td>{item.grades}</td>
                    <td><input class="form-control" type="file" id="formFile" /></td>


                    <td className='text-center'>

                        <button type="button" onClick={(e) => update(e, item.id)} className="btn btn-danger btn-sm">Send</button>
                    </td>
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

                                <h4>Proccesed Form

                                </h4>
                            </div>
                            <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name:</th>
                                            <th>Student ID</th>
                                            <th>Subject Code </th>
                                            <th>Remarks</th>
                                            <th className='text-center'>E-Signature</th>
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