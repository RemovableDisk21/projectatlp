import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Student_Routes from '../../routes/Student_Routes';
import Student_Navbar from "./Student_Navbar";
import Student_Sidebar from "./Student_Sidebar";

const Student_Layouts = () => {
    return (
        <div className="sb-nav-fixed">
            <Student_Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Student_Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Switch>
                            {Student_Routes.map((route, idx) => {
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

export default Student_Layouts;