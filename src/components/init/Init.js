import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "../nav/Nav";
import Home from "../home/Home";
import Inbox from "../inbox/Inbox";
import Profile from "../profile/Profile";
import NotFound from "../notFound/NotFound";
import SignUp from "../signUp/SignUp";
import Login from "../login/Login";
import SendText from "../sendText/SendText"
import ScrollToTop from "../ScrollToTop/ScrollToTop";

class Init extends React.Component{
    render() {
        console.log("init");

        return(
            <Router>
                <Nav/>
                <ScrollToTop>
                <Switch>
                    <Route path= "/" component={Home} exact/>
                    <Route path="/inbox" component={Inbox} exact/>
                    <Route path="/inbox/:id" component={SendText} exact/>
                    <Route path="/profile/:id" component={Profile} exact/>
                    <Route path="/profile" component={Profile} exact/>
                    <Route path="/signUp" component={SignUp} exact/>
                    <Route path="/login" component={Login} exact/>
                    <Route component={NotFound}/>
                </Switch>
                </ScrollToTop>
            </Router>
        )
    }
}
export default Init