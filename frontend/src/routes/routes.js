import Department_Information from "../components/admin/College_Info";
import OnProcessForms from "../components/admin/viewOnprocessed";
import FinishedForms from "../components/admin/viewProcessed";
import Student_List from "../components/admin/viewStudent";
import Faculty_List from "../components/admin/viewFaculties";
import Pending_Faculty from "../components/admin/viewFaculty";

const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/Department_Information', exact: true, name: 'Department_Information', component: Department_Information },
    { path: '/admin/viewOnprocessed', exact: true, name: 'viewOnprocessed', component: OnProcessForms },
    { path: '/admin/viewProcessed', exact: true, name: 'viewProcessed', component: FinishedForms },
    { path: '/admin/viewStudent', exact: true, name: 'viewStudent', component: Student_List },
    { path: '/admin/viewFaculties', exact: true, name: 'viewFaculties', component: Faculty_List },
    { path: '/admin/viewFaculty', exact: true, name: 'viewFaculty', component: Pending_Faculty },
];

export default routes;