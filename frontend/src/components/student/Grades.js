import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Grades() {

    return (
    <div className="card-body">
                                
    <table className="table table-bordered table-striped">
        <thead>
            <tr>
                
                <th>Subject Code:</th>
                <th>Semester</th>
                <th>Year</th>
                <th>Grade</th> 
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
</div>

    );

}

export default Grades;