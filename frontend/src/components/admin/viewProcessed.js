import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from "jspdf";
import bulsulogo from '../../static/images/bsu.png';
import check from '../../static/images/check.png';



function ViewFaculty(props) {

    const generatePDF = (e, filename, reason, student_id, faculty_name, subject_code, semester, school_year, grades, cys) => {
        e.preventDefault();
        var doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'letter',
        });
        doc.addImage(bulsulogo, 'PNG', 46, 22, 24, 24);
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        doc.text('Republic of the Philippines', 105, 25, null, null, 'center');
        doc.setFont('times', 'bold');
        doc.text('BULACAN STATE UNIVERSITY', 105, 30, null, null, 'center');
        doc.setFont('times', 'italic');
        doc.text('Office of the Registrar', 105, 35, null, null, 'center');
        doc.setFont('times', 'normal');
        doc.text('City of Malolos, Bulacan', 105, 40, null, null, 'center');
        doc.text('Tel. no. 919-7800 local 1001 or 1002', 105, 45, null, null, 'center');
        doc.setFont('times', 'bold');
        doc.text('Control No. ________', 25, 55);
        doc.setFont('times', 'normal');
        let date = new Date();
        let formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        doc.text(formattedDate, 170, 60, null, null, 'right');
        doc.text('_________________________', 190, 60, null, null, 'right');
        doc.text('Date', 168, 65, null, null, 'right');
        doc.text(faculty_name, 45, 70);
        doc.text('To:  Prof. __________________________,', 25, 70);
        doc.text(filename, 55, 75);
        doc.text('Mr. /Ms. ________________________________________________________, has an', 35, 75);
        doc.text(subject_code, 63, 80);
        doc.text('incomplete grade in ______________________________________________ which he/she', 25, 80);
        doc.text(semester, 65, 85);
        doc.text('took during the ___________________________________ trimester/semester/summer year', 25, 85);
        doc.text(school_year + ".", 25, 90);
        doc.text('The   reason/s for   the   INCOMPLETE as   reflected   in   the grading sheet is / are', 35, 100);
        doc.text(reason, 27, 105);
        doc.text('_________________________________________________________________________.', 25, 105);
        doc.text('Please accomplish this form and return to this office not later ____________________.', 35, 115);
        doc.text('ALBERT B. VILLENA', 190, 130, null, null, 'right');
        doc.text('Registrar', 178, 135, null, null, 'right');
        doc.text('ACTION TAKEN', 25, 140);
        if (parseFloat(grades) >= 1.00 && parseFloat(grades) <= 3.00) {
            doc.addImage(check, 'PNG', 57, 140, 4, 4);
            doc.text(grades, 84, 146);
        }
        else {
            doc.addImage(check, 'PNG', 57, 145, 4, 4);
            doc.text(grades, 84, 151);
        }
        doc.text('PASSED:________ Rating:__________', 35, 145);
        doc.text('FAILED:________ Rating:__________', 35, 150);
        doc.text('Date: _________________', 25, 160);
        doc.text(faculty_name, 155, 165, null, null, 'right');
        doc.text('________________________________', 190, 165, null, null, 'right');
        doc.text('Subject Instructor/Professor', 180, 170, null, null, 'right');
        doc.text('NOTED:', 25, 175);
        doc.text('________________________________', 25, 190);
        doc.text('Dean', 55, 195);
        doc.text('1 – Registrar’s Office', 35, 205);
        doc.text('1 – Department Concern', 35, 210);
        doc.text('1 – Student’s Copy', 35, 215);
        doc.text('1 – Department Concern', 35, 210);
        doc.text('_______________________________', 190, 210, null, null, 'right');
        doc.text('Student’s Signature', 157, 215, null, null, 'right');
        doc.text(student_id, 175, 220, null, null, 'right');
        doc.text('I.D. No._________________________', 189, 220, null, null, 'right');
        doc.text(cys, 180, 225, null, null, 'right');
        doc.text('Course/Year & Section _____________', 189, 225, null, null, 'right');
        doc.setFont('arial', 'bold');
        doc.text('BulSU-OP-OUR-02F15', 25, 235);
        doc.setFont('arial', 'normal');
        doc.setFontSize(8);
        doc.text('Revision: 0', 25, 240);
        doc.setProperties({
            title: filename,
        });
        doc.save(filename + '.pdf');
    };

    const [loading, setLoading] = useState(true);
    const [faculty, setStudents] = useState([]);

    useEffect(() => {

        axios.get(`/api/done`).then(res => {
            if (res.status === 200) {
                setStudents(res.data.pending)
                setLoading(false);
            }
        });

    }, []);

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
                    <td className='text-center'>
                        <button type="button" onClick={(e) => generatePDF(e, item.name, item.reason, item.student_id, item.faculty, item.subject_code, item.semester, item.school_year, item.grades, item.cys)} className="btn btn-danger btn-sm">download</button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div class="outer-container">
            <br />
            <h4 class="page-title">Finished Forms</h4>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Student ID</th>
                                            <th>Name:</th>
                                            <th>Subject Code:</th>
                                            <th>Remarks</th>
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