import Dashboard from "../components/admin/Dashboard";

import ViewFaculties from "../components/admin/viewFaculties";
import viewFaculty from "../components/admin/viewFaculty";
import ViewOnprocessed from "../components/admin/viewOnprocessed";
import ViewStudent from "../components/admin/viewStudent";
import ViewProcessed from "../components/admin/viewProcessed";
import ViewDashboard from "../components/admin/viewDashboard";
import ViewFac from "../components/admin/viewFac";
import Dash from "../components/admin/Dash";

 
const routes = [
{ path: '/admin', exact: true, name:'Admin' },
{ path: '/admin/dashboard', exact:true, name:'Dashboard', component: Dashboard },

{ path: '/admin/viewFaculty',   exact:true, name:'viewFaculty' , component: viewFaculty },
{ path: '/admin/viewFaculties',   exact:true, name:'viewFaculties' , component: ViewFaculties },
{ path: '/admin/viewStudent',   exact:true, name:'viewStudent' , component: ViewStudent },
{ path: '/admin/viewOnprocessed',   exact:true, name:'viewOnprocessed' , component: ViewOnprocessed},
{ path: '/admin/viewProcessed',   exact:true, name:'viewProcessed' , component: ViewProcessed},
{ path: '/admin/ViewDashboard',   exact:true, name:'ViewDashboard' , component: ViewDashboard},
{ path: '/admin/ViewFac',   exact:true, name:'ViewFac' , component: ViewFac},
{ path: '/admin/Dash',   exact:true, name:'Dash' , component: Dash},
];

export default routes ;