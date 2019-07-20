import React from "react"
import "./index.css"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import avatarIcon from "../../resources/avatarIcon.png";
import Avatar from "@material-ui/core/Avatar";

class TextList extends React.Component{
    render() {
        return(
            <List>
                {['Kamal', 'Jamal', 'Sokhina', 'Rohima'].map((text, index) => (
                    <ListItem button key={text}
                    onClick={()=>{this.props.changeConversation(text)}}>
                        <Avatar style={{padding:"3px"}} src={avatarIcon}/>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>

        )
    }
}
export default TextList