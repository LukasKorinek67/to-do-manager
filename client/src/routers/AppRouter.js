import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Cookies from "js-cookie";
import Footer from "../components/Footer";
import CreateAccPage from "../components/pages/CreateAccPage";
import CreateTaskPage from "../components/pages/CreateTaskPage";
import EditTaskPage from "../components/pages/EditTaskPage";
import LoginPage from "../components/pages/LoginPage";
import MainPage from "../components/pages/MainPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import TasksPage from "../components/pages/TasksPage";
import UpdateProfilePage from "../components/pages/UpdateProfilePage";
import AuthenticatedRoute from "../components/routes/AuthenticatedRoute";
import UnauthenticatedRoute from "../components/routes/UnauthenticatedRoute";
import history from "../history/history";

export default class AppRouter extends React.Component {

    checkLoginStatus() {
        if(Cookies.get("loggedIn")){
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (  
            <Router history={history}>
                <div>
                    {/* <Header loggedIn={this.checkLoginStatus()}/> */}
                    <Switch>
                        <UnauthenticatedRoute path="/" component={MainPage} exact={true} appProps={this.checkLoginStatus()} />
                        <UnauthenticatedRoute path="/createAcc" component={CreateAccPage} appProps={this.checkLoginStatus()} />
                        <UnauthenticatedRoute path="/login" component={LoginPage} appProps={this.checkLoginStatus()} />
                        <AuthenticatedRoute path="/updateProfile" component={UpdateProfilePage} appProps={this.checkLoginStatus()} />
                        <AuthenticatedRoute path="/tasks" component={TasksPage} appProps={this.checkLoginStatus()} />
                        <AuthenticatedRoute path="/createTask" component={CreateTaskPage} appProps={this.checkLoginStatus()} />
                        <AuthenticatedRoute path="/editTask/:id" component={EditTaskPage} appProps={this.checkLoginStatus()} />
                        <Route component={NotFoundPage} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}