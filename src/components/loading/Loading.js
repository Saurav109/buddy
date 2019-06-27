import React from "react"
import "./index.css"
import {CircularProgress} from "@material-ui/core";

class Loading extends React.Component{

    render() {
        return(
            <div className="loading">
                <CircularProgress size={70}/>
            </div>
        )
    }
}

export default Loading