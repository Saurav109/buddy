import React from "react"
import CardMedia from "@material-ui/core/CardMedia";
import {CardHeader} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import avatarIcon from "../../resources/avatarIcon.png";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import DialogContent from "@material-ui/core/DialogContent";
import Conversation from "../inbox/Conversation";
import "./index.css"

class ImagePostView extends React.Component{
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
            <Card className="postItem">
                <div>
                    {this.props.fileUrl &&
                        <CardMedia onClick={this.props.viewImage} image={this.props.fileUrl}
                                   style={{height: "100%", paddingTop: '100%', width: "100%",}}/>}

                    <div style={{padding: "13px"}}>
                        <CardHeader
                            avatar={
                                <Avatar  src={this.props.profileImageUrl ? this.props.profileImageUrl : avatarIcon}/>}

                            title={
                                <div>
                                    <Typography variant="h6">{this.props.text}</Typography>
                                    <Typography display="inline">{this.props.likes?this.props.likes:0} {this.props.likes>1?"Likes":"Like"}</Typography>
                                    <Typography variant="subtitle1"><Link to={"/profile/" + this.props.userUid}><b>
                                        {this.props.userName ? this.props.userName : "no name"}
                                    </b> </Link></Typography>
                                    <Typography display="inline"  style={this.props.isLiked?this.likeStyle:this.unlikeStyle}
                                                onClick={this.props.performLike}>Like</Typography>

                                </div>}

                            subheader={this.props.time}>
                        </CardHeader>
                    </div>
                </div>

                <Dialog
                    fullScreen={true}
                    fullWidth={true}
                    open={this.props.showFullscreen} onClose={this.props.viewImage}>
                    <DialogContent>
                        <div style={{width:"70%",float:"left",position:"fixed",height:"100%"}}>
                            <div  style={{ position:"absolute", width:"100%",height:"100%", left:"0",right:"0",top:"0",bottom:"0",margin:"auto"}}>
                                <img style={{width:"100%"}} src={this.props.fileUrl}
                                     alt={this.props.fileUrl}/>
                            </div>
                        </div>
                        <div style={{width:"20%",float:"right"}}>
                            <Button size="medium" variant="text" fullWidth="false" onClick={this.props.viewImage}>Close</Button>
                            <Conversation/>
                        </div>
                    </DialogContent>
                </Dialog>
            </Card>
        )
    }
}

export default ImagePostView