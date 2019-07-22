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
import {Paper} from "@material-ui/core";

class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversationList: [],
            activeConversation: props.id
        };
        this.changeConversation = this.changeConversation.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.databaseHelper = new Database();

    }

    render() {
        return (
            <div>
                <Paper className="inbox" >
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <List className="convoList">
                        {
                            this.state.conversationList.map(value => {
                                return (
                                    <ListItem
                                        selected={value.key===this.state.activeConversation}
                                        button
                                        onClick={() => {
                                            this.changeConversation(value.key)
                                        }}>
                                        <Avatar style={{padding: "3px"}} src={avatarIcon}/>
                                        <ListItemText className="inboxText" primary={value.val.name}/>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Paper>

                <div style={{width: "80%", float: "right"}}>
                    <Conversation convo={this.state.activeConversation} />
                </div>
            </div>
        )

    }

    componentDidMount() {
        this.databaseHelper.getAllConversation(firebase.auth().currentUser.uid, this.getAllData)
    }

    getAllData(snapshot) {
        snapshot.forEach(value => {
            this.setState(prevState => {
                let newConversation = prevState.conversationList;
                newConversation.push({val: value.val(), key: value.key});
                return {
                    conversationList: newConversation
                }
            })
        });
    }

    changeConversation(convoId) {
        // if (this.props.history) {
        //     this.props.history.push("/inbox/" + name);
        //     this.setState({
        //         activeConversation: name
        //     })
        // }
        this.setState({
            activeConversation: convoId
        })

    }
}

export default Inbox