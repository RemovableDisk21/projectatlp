import Profile from "../components/student/Student_Profile";
import RequestForm from "../components/student/Student_RequestForm";
import RequestList from "../components/student/Student_RequestList";

const routes_student = [
    { path: '/student', exact: true, name: 'Student' },
    { path: '/student/Profile', exact: true, name: 'Profile', component: Profile },
    { path: '/student/RequestForm', exact: true, name: 'RequestForm', component: RequestForm },
    { path: '/student/RequestList', exact: true, name: 'RequestList', component: RequestList },
];

export default routes_student;