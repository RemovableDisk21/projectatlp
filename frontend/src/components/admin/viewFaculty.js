import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
function ViewFaculty(props) {
    
    
    const [loading, setLoading] = useState(true);
    const [faculty, setStudents] = useState([]);

    useEffect(() => {

        axios.get(`/api/pendingfaculty`).then(res=>{
            if(res.status === 200)
            {
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
        console.log(id);
        const data = {
            status:"accepted",
            
        }

        axios.put(`/api/update/${id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success")
               console.log("test");
               thisClicked.closest("tr").remove();
               
            }
            
        });
    } 
    const deleteStudent = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-faculty/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Pending Faculty Data...</h4>
    }
    else
    {
        var faculty_HTMLTABLE = "";
       
        faculty_HTMLTABLE = faculty.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.employee_id}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>{item.status}</td>
                    <td className='text-center'>
                        <button onClick={(e) => update(e, item.id)} className="btn btn-success btn-sm">Confirm</button>
                    &nbsp;&nbsp;&nbsp;
                        <button type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger btn-sm">Decline</button>
                    </td>
                </tr>
            );
        });
    }

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
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Employee ID:</th>
                                            <th>Email Address: </th>
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

export default ViewFaculty;