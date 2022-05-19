import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { useState ,useEffect} from "react";

function Dashboard(){
    
    const  [ dashboardInput , setRegister] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("auth_id");
        axios.get(`/api/getprofile/${id}`).then(res=>{
            if(res.status === 200)
            {
                console.log(res.data.profile);
                setRegister(res.data.profile);
                
                //setLoading(false);
            }
        });

    }, []);

    const handleInput = (e) => {
        e.persist();
        setRegister({...dashboardInput, [e.target.name]: e.target.value});
    }
   
    const dashboardSubmit = (e) => {
        e.preventDefault();
   
        const data = {
            name: dashboardInput.name,
            gender: dashboardInput.gender,
            civil: dashboardInput.civil,
            nationality: dashboardInput.nationality,
            number: dashboardInput.number,
            course: dashboardInput.course,
            year: dashboardInput.year,
            section: dashboardInput.section,
            student_id: dashboardInput.student_id,
            email: dashboardInput.email,
        }
       console.log(data);
        const id = localStorage.getItem("auth_id");
        axios.put(`/api/student_profile/${id}`, data).then(res =>{
               if(res.data.status === 200)
               {
                  
                   swal("Succes","Update Profile Settings Successfully","success");
                   
               }
               else
               {
                   setRegister({... dashboardInput, error_list: res.data.validation_error});
               }
        });
       
    }

    return(
        <div className="container rounded bg-white mt-5 mb-5">
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span className="font-weight-bold">Edogaru</span><span className="text-black-50">edogaru@mail.com.my</span><span> </span></div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                <form onSubmit={dashboardSubmit}>
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">Name</label>
                    <input type="text" name ="name" onChange={handleInput} value = {dashboardInput.name} className="form-control" placeholder="first name" />
                    </div>
                   
                </div>
                
                
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Gender</label><input type="text" name ="gender" className="form-control" onChange={handleInput} value = {dashboardInput.gender} placeholder="enter phone number"  /> </div>
                    <div className="col-md-12"><label className="labels">Civil Status</label><input type="text" name ="civil" onChange={handleInput} value = {dashboardInput.civil}className="form-control" placeholder="enter address line 1"  />    </div>
                    <div className="col-md-12"><label className="labels">Student ID:</label><input type="text" disabled name ="student_id"onChange={handleInput} value = {dashboardInput.student_id}className="form-control" placeholder="enter Student ID"  />  </div>
                    <div className="col-md-12"><label className="labels">Nationality</label><input type="text" name ="nationality" onChange={handleInput} value = {dashboardInput.nationality} className="form-control" placeholder="enter address line 2"  /> </div>
                    <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" name ="number" onChange={handleInput} value = {dashboardInput.number} className="form-control" placeholder="enter address line 2"  />  </div>
                    <div className="col-md-12"><label className="labels">Email Address</label><input type="text" disabled name ="email" onChange={handleInput} value = {dashboardInput.email} className="form-control" placeholder="enter address line 2" /> </div>
                    <div className="col-md-12"><label className="labels">Course</label><input type="text" name ="course" onChange={handleInput} value = {dashboardInput.course} className="form-control" placeholder="enter address line 2" /> </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">Year</label><input type="text"  name ="year" onChange={handleInput} value = {dashboardInput.year} className="form-control" placeholder="year" /> </div>
                    <div className="col-md-6"><label className="labels">Section</label><input type="text" name ="section" onChange={handleInput} value = {dashboardInput.section} className="form-control"  placeholder="section
                    "/></div>
                </div>
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Save Profile</button></div>
                </form>
            </div>
        </div>

    </div>
</div>


    );
}

export default Dashboard;