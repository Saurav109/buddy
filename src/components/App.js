import React from 'react';
import firebase from "../fire"
import Init from "./init/Init"
import Loading from "./loading/Loading"
import UserManagement from "./userManagement/userManagement"

class App extends React.Component{
    constructor(props) {
        console.log("app started");
        super(props);

        this.state={
            isLoggedIn:null
        };

        firebase.auth().onAuthStateChanged(user=>{
            //if signed in
            if(user){
                console.log("user logged in");
                console.log("user uid:",user.uid);
                this.setState({isLoggedIn:true})
            //if not signed in
            }else {
                console.log("user not logged in");
                this.setState({isLoggedIn:false})
            }
        })
    }

    render() {
        switch (this.state.isLoggedIn) {
            case false:
                return (<UserManagement/>);
            case true:
                return (<Init/>);
            default:
                return (<Loading/>)
        }
    }
}
export default App;

