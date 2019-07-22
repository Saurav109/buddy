import React from "react"
import "./index.css"
import List from "@material-ui/core/List";
import {TextField} from "@material-ui/core";
import Database from "../database/Database";
import Text from "./Text";
import * as firebase from "firebase";
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

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("clicking",nextProps);

        this.databaseHelper.getAllText("/conversation/" + nextProps.convo, this.storeData)
    }


    render() {
        if (this.props.convo) {
            return (
                <div className="convo">
                    <br/>
                    <br/>
                    <br/>
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
                               className="convoTextField"
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
        let tmpAllText=[];
        snapshot.forEach(val=>{
            tmpAllText.push({val: val.val(), key: val.key})
        });

        this.setState({
            allText:tmpAllText
        })

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