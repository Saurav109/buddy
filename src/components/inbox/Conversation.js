import React from "react"
import "./index.css"
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Database from "../database/Database";
import Avatar from "@material-ui/core/Avatar";
import avatarIcon from "../../resources/avatarIcon.png";
import Text from "./Text";
import * as firebase from "firebase";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import NotFound from "../notFound/NotFound";

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            allText: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.storeData = this.storeData.bind(this);
        this.databaseHelper = new Database();
    }

    componentDidMount() {
        // this.databaseHelper.getData("/conversation/"+this.props.convo,this.storeData)
        this.databaseHelper.getAllText("/conversation/" + this.props.convo, this.storeData)
    }

    render() {
        if (this.props.convo) {
            return (
                <div style={{width: "100%"}}>
                    <List>

                        {
                            this.state.allText.map(s => {
                                return (
                                    <Text text={s}/>
                                )
                            })
                        }
                    </List>

                    <TextField fullWidth={true}
                               value={this.state.text}
                               onChange={this.handleChange}
                               onKeyPress={this.handleSubmit}
                               placeholder="write your text" variant="outlined"
                               style={{position: "fixed", bottom: "0", padding: "13px", backgroundColor: "white"}}/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                </div>
            )

        } else {
            return <NotFound title="Inbox"/>
        }
    }

    storeData(snapshot) {
        console.log("all data", snapshot.val());

        this.setState(prevState => {
            let newAllText = prevState.allText;
            newAllText.push({val: snapshot.val(), key: snapshot.key});
            return {
                allText: newAllText
            }
        });
        console.log("local", this.state.allText)

    }

    handleSubmit(event) {
        if (event.which === 13 || event.keyCode === 13) {
            console.log("hello", event.target.value, this.props.convo);
            var newText = {
                text: event.target.value,
                time_stamp: firebase.database.ServerValue.TIMESTAMP,
                uid: firebase.auth().currentUser.uid
            };
            this.databaseHelper.sendMessage(this.props.convo, newText, () => {
                this.setState({text: ""})
            })
        }

    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        })
    }
}

export default Conversation