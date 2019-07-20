import React from "react"
import Inbox from "../inbox/Inbox";

class SendText extends React.Component{

    render() {
        return(
            <Inbox id={this.props.match.params.id}/>
        )
    }
}
export default SendText