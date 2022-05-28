import Profile from "../components/faculty/Faculty_Profile";
import CompletionList from "../components/faculty/Faculty_CompletionList";

const routes_faculty = [
    { path: '/faculty', exact: true, name: 'Faculty' },
    { path: '/faculty/Profile', exact: true, name: 'Profile', component: Profile },
    { path: '/faculty/Completion_List', exact: true, name: 'CompletionList', component: CompletionList },
];

export default routes_faculty;