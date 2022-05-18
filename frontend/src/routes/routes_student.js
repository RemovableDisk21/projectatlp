import Dashboard from "../components/student/Dashboard";

import Profile from "../components/student/Profile";
import Request from "../components/student/Request";
import Formlist from "../components/student/Formlist";
import Grades from "../components/student/Grades";
const routes_student = [
{ path: '/student', exact: true, name:'Student' },
{ path: '/student/dashboard', exact:true, name:'Dashboard', component: Dashboard },
{ path: '/student/profile',   exact:true, name:'Profile' , component: Profile },
{ path: '/student/request',   exact:true, name:'Request' , component: Request },
{ path: '/student/Formlist',   exact:true, name:'Formlist' , component: Formlist },
{ path: '/student/Grades',   exact:true, name:'Grades' , component: Grades },
];

export default routes_student ;