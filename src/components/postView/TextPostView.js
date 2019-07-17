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
import "./index.css"

class TextPostView extends React.Component{

    likeStyle={
        color:"#0D4D90",
        cursor: "pointer",
        fontWeight:"bold"
    };
    unlikeStyle={
        color:"#2B2B2B",
        cursor: "pointer"
    };

    render() {
        return(
            <div>
                <Card className="postItem" >
                    <div style={{padding:"13px"}} onClick={this.props.viewImage}>
                        <Typography  rows="2" variant="h3">{this.props.text}</Typography>
                    </div>
                    <CardHeader
                        avatar={
                            <Avatar  src={this.props.profileImageUrl ? this.props.profileImageUrl : avatarIcon}/>}
                        title={
                            <div>
                                <Typography display="inline">{this.props.likes?this.props.likes:0} {this.props.likes>1?"Likes":"Like"}</Typography>
                                <Typography variant="subtitle1"><Link to={"/profile/" + this.props.profile}><b>
                                    {this.props.profileName ? this.props.profileName : "no name"}
                                </b> </Link></Typography>
                                <Typography display="inline"  style={this.props.like?this.likeStyle:this.unlikeStyle}
                                            onClick={this.props.performLike}>Like</Typography>

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
                        <div style={{padding:"23px",marginTop:"23px", position:"sticky",top:"0",display:"block"}}>
                            <h1 >{this.props.text}</h1>
                        </div>
                        <Typography variant="h6">All Comments</Typography>
                        <div>
                            <Conversation/>
                        </div>

                    </DialogContent>
                </Dialog>
            </div>

        )
    }
}
export default TextPostView