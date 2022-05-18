import AddSubject from "../components/faculty/AddSubject";

import ApprovedForm from "../components/faculty/ApprovedForm";
import ApprovedStudents from "../components/faculty/ApprovedStudents";
import Dashboard from "../components/faculty/Dashboard";
import FailedStudents from "../components/faculty/FailedStudents";
import Profile from "../components/faculty/Profile";
import RequestedForm from "../components/faculty/RequestedForm";


const routes_faculty = [
    { path: '/faculty', exact: true, name: 'Faculty' },
    { path: '/faculty/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/faculty/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/faculty/RequestedForm', exact: true, name: 'RequestedForm', component: RequestedForm },
    { path: '/faculty/ApprovedForm', exact: true, name: 'Approved', component: ApprovedForm },
    { path: '/faculty/FailedStudents', exact: true, name: 'FailedStudents', component: FailedStudents },
    { path: '/faculty/ApprovedStudents', exact: true, name: 'ApprovedStudents', component: ApprovedStudents },
    { path: '/faculty/AddSubject', exact: true, name: 'AddSubject', component: AddSubject },

];

export default routes_faculty;