import React from "react";
import { Link } from "react-router-dom";
function Request(){

    return(
        <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h4>Request Form</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label>Full Name:</label>
                                <input type ="" name ="name"  className = "form-control"  />
                                
                            </div>
                            <div className="form-group mb-3">
                                <label>Student ID:</label>
                                <input type ="" name ="student_id" className = "form-control" />
                              
                            </div>
                            
                            <label>Professor:</label>
                            <div class="input-group mb-3">
                            
                             <select class="form-select" id="inputGroupSelect02">
                                <option selected>Choose...</option>

                                   
                            </select>
                            </div>

                            <label>Subject Code:</label>
                            <div class="input-group mb-3">
                            
                             <select class="form-select" id="inputGroupSelect02">
                                <option selected>Choose...</option>
                                     <option value="1">One</option>
                                        <option value="2">Two</option>
                                   
                            </select>
                            </div>
                            
                            <label>Semester:</label>
                            <div class="input-group mb-3">
                            
                             <select class="form-select" id="inputGroupSelect02">
                                <option selected>Choose...</option>
                                     <option value="1">First</option>
                                        <option value="2">Second</option>
                                   
                            </select>
                            </div>

                            <label>SY:</label>
                            <div class="input-group mb-3">
                            
                             <select class="form-select" id="inputGroupSelect02">
                                <option selected>Choose...</option>
                                     <option value="1">One</option>
                                        <option value="2">Two</option>
                                    <option value="3">Three</option>
                            </select>
                            </div>
                            
                            

                            <div className="form-group mb-3">
                                <label>Reason for INCOMPLETE:</label>
                                <input type =" " name ="password"  className = "form-control"  />
                                
                            </div>

                            <div class="mb-3">
                            <label for="formFile" class="form-label">E- signature</label>
                            <input class="form-control" type="file" id="formFile"/>
                            </div>
                            

                            <div className="form-group mb-3">
                                <button type="submit"className="btn btn-primary ">Request</button>
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
 


    );
}

export default Request;