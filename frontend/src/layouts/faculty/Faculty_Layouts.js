import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Faculty_Routes from "../../routes/Faculty_Routes";
import Faculty_Navbar from "./Faculty_Navbar";
import Faculty_Sidebar from "./Faculty_Sidebar";

const FacultyLayouts = () => {
    return (
        <div className="sb-nav-fixed">
            <Faculty_Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Faculty_Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Switch>
                            {Faculty_Routes.map((route, idx) => {
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
                        </Switch>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default FacultyLayouts;