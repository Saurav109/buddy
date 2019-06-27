import React from 'react';
import './App.css';
import firebase from "../fire"
import Init from "./Init/Init"
import Loading from "./loading/Loading"
import UserManagement from "./userManagement/userManagement"

class App extends React.Component{
    constructor(props) {
        console.log("app started");
        super(props);

        this.state={
            pageState:"loading"
        };

        firebase.auth().onAuthStateChanged(user=>{
            //if signed in
            if(user){
                console.log("userManagement uid:",user.uid);
                this.setState({pageState:"home"})
            //if not signed in
            }else {
                console.log("not logged in");
                this.setState({pageState:"login"})
            }
        })
    }

    render() {
        switch (this.state.pageState) {
            case "login":
                return (<UserManagement/>);
            case "home":
                return (<Init/>);
            default:
                return (<Loading/>)
        }
    }
}
export default App;

