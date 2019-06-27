import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "../nav/Nav";
import Home from "../home/Home";
import Inbox from "../inbox/Inbox";
import Profile from "../profile/Profile";
import NotFound from "../notFound/NotFound";
import Main from "./Main"
import SignUp from "../signUp/SignUp";
import Login from "../login/Login";

class Init extends React.Component{
    render() {
        console.log("init");

        return(
            <Router>
                <Nav/>
                <Switch>
                    <Route path= "/" component={Main} exact/>
                    <Route path="/home" component={Home} exact/>
                    <Route path="/inbox" component={Inbox} exact/>
                    <Route path="/profile/:id" component={Profile} exact/>
                    <Route path="/profile" component={Profile} exact/>
                    <Route path="/signUp" component={SignUp} exact/>
                    <Route path="/login" component={Login} exact/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }

}
export default Init