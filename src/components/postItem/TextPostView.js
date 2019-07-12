import React from "react"
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import avatarIcon from "../../resources/avatarIcon.png";
import {Link} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Conversation from "../inbox/Conversation";

class TextPostView extends React.Component{
    render() {
        return(
            <div>
                <Card className="postItem" >
                    <div className="maxlineText" onClick={this.props.viewImage}>
                        {/*<Typography  rows="2" variant="h3">{this.props.text}</Typography>*/}
                        <p>{this.props.text}</p>
                    </div>
                    <CardHeader
                        avatar={
                            <Avatar  src={this.props.profileImageUrl ? this.props.profileImageUrl : avatarIcon}/>}
                        title={
                            <div>
                                <Typography variant="subtitle1"><Link to={"/profile/" + this.props.profile}><b>
                                    {this.props.profileName ? this.props.profileName : "no name"}
                                </b> </Link></Typography>
                                <Typography display="inline" style={{cursor: "pointer", color: "#3F6299"}}
                                            onClick={this.props.performLike}><b> Like </b></Typography>
                                <Typography display="inline">all like:{this.props.likes?this.props.likes:0}</Typography>
                            </div>}
                        subheader={this.props.time}>
                    </CardHeader>
                </Card>
                <Dialog
                    fullScreen={true}
                    fullWidth={true}
                    open={this.props.show} onClose={this.props.viewImage}>
                    <DialogContent>
                        <Button size="medium" variant="text" fullWidth="false" onClick={this.props.viewImage}>Close</Button>
                        <Typography  variant="h3">{this.props.text}</Typography>
                        <Conversation/>

                    </DialogContent>
                </Dialog>
            </div>

        )
    }
}
export default TextPostView