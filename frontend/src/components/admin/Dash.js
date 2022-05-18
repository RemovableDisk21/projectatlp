import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';;

function Dash() {
    const history = useHistory();
    const [studentInput, setStudent] = useState([]); //axios.get eto
    const [facultyInput, setFaculty] = useState(""); //handleInput eto
    const [subjectInput, setSubject] = useState([]); //axios.get
    const [subjects, Subject] = useState(""); //handleinput
    useEffect(() => {

        axios.get(`/api/faculties`).then(res => {
            if (res.status === 200) {
                setStudent(res.data.faculty)
                // setLoading(false);
            }
        });

        axios.get(`/api/subjectcode`).then(res => {
            if (res.status === 200) {
                setSubject(res.data.subject)
                // setLoading(false);
            }
        });


    }, []);

    const handleInput = (e) => {
        e.persist();
        e.preventDefault();

        setFaculty(e.target.value);
        console.log(e.target.value);
    }

    const handleinput = (e) => {
        e.persist();
        e.preventDefault();

        Subject(e.target.value);
        console.log(e.target.value);

    }

    const saveStudent = (e) => {
        e.preventDefault();
        console.log(facultyInput + ' ' + subjects);

        const data = {

            faculty: facultyInput,
            assign: subjects,




        }

        axios.post(`/api/assignsub`, data).then(res => {

            if (res.data.status === 200) {
                swal("Success!", "nailagay na sa wakas!", "success");

            }
            else if (res.data.status === 422) {
                swal("Success!", "nailagay na sa wakas!", "success");
            }
        });
    }
    var faculty_HTMLTABLE = "";
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Faculty</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveStudent}>
                                <div className="form-group mb-3">
                                    <label>Faculty:</label>
                                    <div class="input-group mb-3">

                                        <select id='faculty' name="faculty" value={facultyInput} onChange={handleInput} className="form-control" aria-label="Default select example">
                                            <option value={'0'}>Faculty:</option>

                                            {studentInput.map((faculty, index) =>

                                                <option key={faculty.id} name={faculty.id} value={faculty.name}>{faculty.name}</option>
                                            )}
                                        </select>
                                    </div>





                                    <label>Subject Code:</label>
                                    <div class="input-group mb-3">

                                        <select id='subject' name="subject" value={subjects} onChange={handleinput} className="form-control" aria-label="Default select example">
                                            <option value={'0'}>Faculty:</option>

                                            {subjectInput.map((subject, index) =>

                                                <option key={subject.id} name={subject.id} value={subject.code + ' ' + subject.name + ' ' + subject.syandsem}>{subject.code + ' ' + subject.name + ' ' + subject.syandsem}</option>
                                            )}
                                        </select>
                                    </div>


                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Assign Faculty</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default Dash;