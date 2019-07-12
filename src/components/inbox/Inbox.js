import React from "react"
import "./index.css"
import TextList from "./TextList";
import Conversation from "./Conversation";

class Inbox extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            activeConversation:"one"
        };
        this.changeConversation=this.changeConversation.bind(this);
    }

    render() {
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <br/>

                <div style={{width:"20%",float:"left",position:"fixed"}}>
                    <TextList changeConversation={this.changeConversation}/>
                </div>
                <div style={{width:"80%",float:"right"}}>
                    <Conversation convo={this.state.activeConversation}/>
                </div>
            </div>
        )
    }

    changeConversation(name){
        this.setState({
            activeConversation:name
        })
    }
}
export default Inbox