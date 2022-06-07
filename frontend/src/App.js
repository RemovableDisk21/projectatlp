import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/frontend/auth/Login';
import RegisterStudent from './components/frontend/auth/Register_Student';
import RegisterFaculty from './components/frontend/auth/Register_Faculty';
import AdminLayouts from './layouts/admin/Admin_Layouts';
import FacultyLayouts from './layouts/faculty/Faculty_Layouts';
import StudentLayouts from './layouts/student/Student_Layouts';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={RegisterStudent} />
                    <Route path="/register_faculty" component={RegisterFaculty} />
                    <Route path="/admin" name="Admin" render={(props) => <AdminLayouts {...props} />} />
                    <Route path="/faculty" name="Faculty" render={(props) => <FacultyLayouts {...props} />} />
                    <Route path="/student" name="Student" render={(props) => <StudentLayouts {...props} />} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
