import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import routes_faculty from "../../routes/routes_faculty";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

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
                            {routes_faculty.map((route, idx) => {
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
                            <Redirect from="faculty" to="/faculty/dashboard" />
                        </Switch>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MasterLayouts;