import React from "react"
import "./index.css"

class NotFound extends React.Component{
    render() {
        return(
            <div className="pageNotFound">
                <h1>{this.props.title||"Page not found"}</h1>
            </div>
        )
    }
}
export default NotFound