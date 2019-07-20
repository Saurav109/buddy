import React from "react"
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import avatarIcon from "../../resources/avatarIcon.png";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "../../fire"

class Text extends React.Component{
    myText={
        textAlign:"right",

    };
    otherText={
        textAlign: "left"
    };


    render() {
        if(firebase.auth().currentUser.uid===this.props.text.val.uid){
            return (<ListItem button style={this.myText}>
                <ListItemText >{this.props.text.val.text}</ListItemText>
                <Avatar src={avatarIcon}/>
            </ListItem>)
        }else {
            return (
                <ListItem button style={this.otherText}>
                    <Avatar src={avatarIcon}/>
                    <ListItemText  >{this.props.text.val.text}</ListItemText>
                </ListItem>
            )
        }

    }
}

export default Text