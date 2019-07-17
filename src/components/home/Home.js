import React from "react"
import "./index.css"
import Feed from "../feed/Feed"
import {Redirect} from 'react-router-dom'
import firebase from "../../fire";
import AddPost from "../addPost/AddPost";


class Home extends React.Component{

    render() {
        return(
            firebase.auth().currentUser!=null?
            <div>
                <AddPost/>
                <Feed/>
            </div>:
            <div>
                <Redirect to="/"/>
            </div>
        )
    }
}

export default Home