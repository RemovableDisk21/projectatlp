import Department_Information from "../components/admin/Admin_DepInfo";
import OnProcessForms from "../components/admin/Admin_ProcessForms";
import FinishedForms from "../components/admin/Admin_FinishedForms";
import Student_List from "../components/admin/Admin_StudentList";
import Faculty_List from "../components/admin/Admin_FacultyList";
import Pending_Faculty from "../components/admin/Admin_PendingFaculty";

const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/Admin_Department_Information', exact: true, name: 'Admin_Department_Information', component: Department_Information },
    { path: '/admin/Admin_ProcessForms', exact: true, name: 'Admin_ProcessForms', component: OnProcessForms },
    { path: '/admin/Admin_FinishedForms', exact: true, name: 'Admin_FinishedForms', component: FinishedForms },
    { path: '/admin/Admin_StudentList', exact: true, name: 'Admin_StudentList', component: Student_List },
    { path: '/admin/Admin_FacultyList', exact: true, name: 'Admin_FacultyList', component: Faculty_List },
    { path: '/admin/Admin_PendingFaculty', exact: true, name: 'Admin_PendingFaculty', component: Pending_Faculty },
];

export default routes;