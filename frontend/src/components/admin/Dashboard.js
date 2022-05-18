import React, {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';;

function Dashboard(){
    const history = useHistory();
    const [studentInput, setStudent] = useState({
        code: '',
        name: '',
        syandsem: '',
        
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setStudent({...studentInput, [e.target.name]: e.target.value })
    }

    const saveStudent = (e) => {
        e.preventDefault();
        
        const data = {
            code:studentInput.code,
            name:studentInput.name,
            syandsem:studentInput.syandsem,
            
        }

        axios.post(`/api/subject`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setStudent({
                    name: '',
                    course: '',
                    email: '',
                    phone: '',
                    error_list: [],
                });
                history.push('/admin/viewFaculty');
            }
            else if(res.data.status === 422)
            {
                setStudent({...studentInput, error_list: res.data.validate_err });
            }
        });
    }
    return(
        <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h4>Add Subject</h4>
                    </div>
                    <div className="card-body">
                        <form  onSubmit={saveStudent}>
                            <div className="form-group mb-3">
                                <label>Subject Code:</label>
                                <input type ="" name ="code" onChange={handleInput} value={studentInput.code}  className = "form-control"  />
                                
                            </div>
                            <div className="form-group mb-3">
                                <label>Name:</label>
                                <input type ="" name ="name" onChange={handleInput} value={studentInput.name} className = "form-control" />
                              
                            </div>
                            
                            <div className="form-group mb-3">
                                <label>SY and Semester:</label>
                                <input type ="" name ="syandsem"onChange={handleInput} value={studentInput.syandsem} className = "form-control" />
                              
                            </div>
                            
                            
                           
                           

                            <div className="form-group mb-3">
                                <button type="submit"className="btn btn-primary ">Add Subject</button>
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
 


    );
}

export default Dashboard;