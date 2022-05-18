import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './components/frontend/auth/Home';
import Login from './components/frontend/auth/Login';
import Logins from './components/frontend/auth/Login_admin';
import Register from './components/frontend/auth/Register';
import Registers from './components/frontend/auth/Register_faculty';
import MasterLayout from './layouts/admin/MasterLayout';
import MasterLayouts from './layouts/faculty/MasterLayouts';
import MasterLayoutss from './layouts/student/MasterLayoutss';
import axios from 'axios';

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
          <Route path="/register" component={Register} />
          <Route path="/register_faculty" component={Registers} />
          <Route path="/login_admin" component={Logins} />
          <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} />} />
          <Route path="/faculty" name="Faculty" render={(props) => <MasterLayouts {...props} />} />
          <Route path="/student" name="Student" render={(props) => <MasterLayoutss {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
