import React from "react";
import { Switch, Route } from 'react-router-dom';
import Admin_Routes from "../../routes/Admin_Routes";
import Admin_Navbar from './Admin_Navbar';
import Admin_Sidebar from "./Admin_Sidebar";
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

const AdminLayouts = () => {
    return (
        <div className="sb-nav-fixed">
            <Admin_Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Admin_Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Switch>
                            {Admin_Routes.map((route, idx) => {
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

export default AdminLayouts;