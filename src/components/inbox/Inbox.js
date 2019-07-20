import React from "react"
import "./index.css"
import Conversation from "./Conversation";
import Database from "../database/Database";
import firebase from "../../fire"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import avatarIcon from "../../resources/avatarIcon.png";
import ListItemText from "@material-ui/core/ListItemText";

class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversationList: [],
            activeConversation: props.id
        };
        this.changeConversation = this.changeConversation.bind(this);
        this.getAllData =this.getAllData.bind(this);
        this.databaseHelper = new Database();
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>

                <div style={{width: "20%", float: "left", position: "fixed"}}>
                    <List>
                        {
                            this.state.conversationList.map(value => {
                                return (
                                    <ListItem button
                                              onClick={() => {
                                                  this.changeConversation(value.key)
                                              }}>
                                        <Avatar style={{padding: "3px"}} src={avatarIcon}/>
                                        <ListItemText primary={value.val.name}/>
                                    </ListItem>
                                )
                            })
                        }
                    </List>

                </div>
                <div style={{width: "80%", float: "right"}}>
                    <Conversation convo={this.state.activeConversation}/>
                </div>
            </div>
        )

    }

    componentDidMount() {
        this.databaseHelper.getAllConversation(firebase.auth().currentUser.uid,this.getAllData)
    }

    getAllData(snapshot) {
        snapshot.forEach(value => {
            console.log("con",value);
            this.setState(prevState => {
                let newConversation = prevState.conversationList;
                newConversation.push({val: value.val(), key: value.key});
                return {
                    conversationList: newConversation
                }
            })
        });
    }

    changeConversation(name) {
        if(this.props.history){
            this.props.history.push("/inbox/"+name);
            this.setState({
                activeConversation:name
            })
        }

    }
}

export default Inbox