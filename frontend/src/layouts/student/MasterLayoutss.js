import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import routes_student from '../../routes/routes_student';
import Navbar from "../student/Navbar";
import Sidebar from "../student/Sidebar";

const MasterLayouts = () => {
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Switch>
                            {routes_student.map((route, idx) => {
                                return (
                                    route.component && (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) => (
                                                <route.component {...props} />
                                            )}
                                        />
                                    )
                                )
                            })}
                            <Redirect from="student" to="/student/dashboard" />
                        </Switch>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MasterLayouts;