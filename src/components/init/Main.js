import React from "react"
import {Redirect} from "react-router";

class Main extends React.Component{
    render() {
        return(
            <Redirect to="/home"/>
        )
    }
}

export default Main