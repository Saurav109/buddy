import React from "react"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import SignUp from "../signUp/SignUp";
import Login from "../login/Login";

class UserManagement extends React.Component{
    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/signUp" component={SignUp} exact/>
                    <Route path="/login" component={Login} exact/>
                </Switch>
                <Redirect to="/login"/>
            </Router>
        )
    }
}

export default UserManagement