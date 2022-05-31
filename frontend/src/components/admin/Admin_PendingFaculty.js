import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import EmailJS from "emailjs-com";

function PendingFaculty(props) {
    const [faculty, setStudents] = useState([]);
    const form = useRef();
    const form2 = useRef();

    useEffect(() => {
        axios.get(`/api/pendingfaculty`).then(res => {
            if (res.status === 200) {
                setStudents(res.data.pending)
            }
        });

    }, []);

    const update = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        // const student_id = props.match.params.id;
        // const data = studentInput;
        console.log(id);
        const data = {
            status: "accepted",

        }

        axios.put(`/api/update/${id}`, data).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Faculty Accepted',
                    showConfirmButton: false,
                    timer: 1500
                })
                thisClicked.closest("tr").remove();
                EmailJS.sendForm(
                    "service_csfbmua","template_ixxh3xd",form.current,"KA0rISbjAH9nNudt-"
                ).then(res=>{
                    console.log(res);
                }).catch(err=>console.log(err));
            }
        });
    }

    const deleteFaculty = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Confirm Decline',
            text: "Are you sure you want to decline this account?",
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
                            title: 'Faculty Declined',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        thisClicked.closest("tr").remove();
                        EmailJS.sendForm(
                            "service_csfbmua","template_ixxh3xd",form2.current,"KA0rISbjAH9nNudt-"
                        ).then(res=>{
                            console.log(res);
                        }).catch(err=>console.log(err));
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
                <td>{item.employee_id}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.status}</td>
                <td className='text-center'>
                    <button onClick={(e) => update(e, item.id)} className="btn btn-success btn-sm">Confirm</button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" onClick={(e) => deleteFaculty(e, item.id)} className="btn btn-danger btn-sm">Decline</button>
                    <form ref={form}>
                        <input type="hidden" name="email" value={item.email} />
                        <input type="hidden" name="name" value={item.name} />
                        <input type="hidden" name="message" value="Congratulations! Your account has been verified by the administrator. You may now login to your account." />
                        <input type="hidden" name="status" value="Accepted" />
                    </form>
                    <form ref={form2}>
                        <input type="hidden" name="email" value={item.email} />
                        <input type="hidden" name="name" value={item.name} />
                        <input type="hidden" name="message" value="We regret to inform you that your account verification was unsuccessful due to the following possible reasons: 
<br> 1. Your information is missing. <br>
2. Your credentials are insufficient. <br>
3. The information you have registered do not match from the server. " />
                        <input type="hidden" name="status" value="Declined" />
                    </form>
                </td>
            </tr>
        );
    });

    return (
        <div class="outer-container">
            <br />
            <h4 class="page-title">Pending Faculty Requests</h4>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Employee ID</th>
                                            <th>Email Address</th>
                                            <th>Role</th>
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
            </div>
        </div>
    );

}

export default PendingFaculty;