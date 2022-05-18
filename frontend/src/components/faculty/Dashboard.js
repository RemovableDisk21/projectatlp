import React from "react";

function Dashboard(){

    return(
        <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h4>Add Subject</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label>Subject Code:</label>
                                <input type ="" name ="name"  className = "form-control"  />
                                
                            </div>
                            <div className="form-group mb-3">
                                <label>Name:</label>
                                <input type ="" name ="student_id" className = "form-control" />
                              
                            </div>
                            
                            <div className="form-group mb-3">
                                <label>SY:</label>
                                <input type ="" name ="student_id" className = "form-control" />
                              
                            </div>
                            <div className="form-group mb-3">
                                <label>Semester:</label>
                                <input type ="" name ="student_id" className = "form-control" />
                              
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