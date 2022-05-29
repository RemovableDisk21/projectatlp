import ViewFaculties from "../components/admin/viewFaculties";
import viewFaculty from "../components/admin/viewFaculty";
import ViewOnprocessed from "../components/admin/viewOnprocessed";
import ViewStudent from "../components/admin/viewStudent";
import ViewProcessed from "../components/admin/viewProcessed";
import College_Info from "../components/admin/College_Info";

const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/viewFaculty', exact: true, name: 'viewFaculty', component: viewFaculty },
    { path: '/admin/viewFaculties', exact: true, name: 'viewFaculties', component: ViewFaculties },
    { path: '/admin/viewStudent', exact: true, name: 'viewStudent', component: ViewStudent },
    { path: '/admin/viewOnprocessed', exact: true, name: 'viewOnprocessed', component: ViewOnprocessed },
    { path: '/admin/viewProcessed', exact: true, name: 'viewProcessed', component: ViewProcessed },
    { path: '/admin/Department_Information', exact: true, name: 'Department_Information', component: College_Info },
];

export default routes;