import React from "react"
import "./index.css"
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class Conversation extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            text:""
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    render() {
        return(
            <div style={{width:"100%"}}>
                <Typography>{this.props.convo}</Typography>
                <List>
                    {['bal ', 'how are you', 'i am fine ,u?', 'me too!!','hi ', 'how are you', 'i am fine ,u?', 'me too!!','hi ', 'how are you', 'i am fine ,u?', 'me too!!',
                        'bal ', 'how are you', 'i am fine ,u?', 'me too!!','hi ', 'how are you', 'i am fine ,u?', 'me too!!','hi ', 'how are you', 'i am fine ,u?', 'me too!!'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText style={{textAlign:"left"}} primary={text} />
                        </ListItem>
                    ))}
                </List>
                <TextField fullWidth={true}
                           value={this.state.text}
                           onChange={this.handleChange}
                           onKeyPress={this.handleSubmit}
                           placeholder="write your text" variant="outlined"
                           style={{position:"fixed",bottom:"0",padding:"13px",backgroundColor:"white"}}/>
            </div>
        )
    }

    handleSubmit(event){
        // this.setState({
        //     text:""
        // })
        console.log("chagihn",event)
    }
    handleChange(event){
        this.setState({
            text:event.target.value
        })
    }
}
export default Conversation