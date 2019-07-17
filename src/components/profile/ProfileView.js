import React from "react"
import "./index.css"
import avatarIcon from "../../resources/avatarIcon.png"
import Typography from "@material-ui/core/Typography";
import Feed from "../feed/Feed";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import {LinearProgress} from "@material-ui/core";

class ProfileView extends React.Component{

    render() {
        return(
            <div>
                <div className="profileView">
                    <div className="profileInfo">
                        <img alt="profile picture" className="profileImage"
                             onClick={this.props.handleDialog||null}
                             src={this.props.profileImageUrl || avatarIcon}/>
                        <Typography variant="h4">{this.props.name}</Typography>
                        <Typography variant="subtitle2">{this.props.bio}</Typography>
                    </div>
                    <div className="profileStatus">
                        <Feed location={this.props.location}/>
                    </div>
                </div>

                <Dialog open={this.props.dialog} >
                    {this.props.uploadPercent!==null &&
                    <LinearProgress value={this.props.uploadPercent}
                                    variant="determinate" style={{height:"13px"}}/>}

                    <DialogContent>
                        <div className="dialog">
                            <Button  onClick={this.props.handleDialog} >cancel</Button>
                            <h3 >Update Profile</h3>

                            {this.props.fileUrl ?  <img src={this.props.fileUrl} className="profileImage"/>:
                                <img alt="profile picture" className="profileImage"
                                     src={this.props.profileImageUrl || avatarIcon}/>}

                            <br/>
                            <TextField value={this.props.tmpName} name="tmpName" onChange={this.props.textInputChange} variant="outlined" placeholder="Name"/>
                            <br/>
                            <TextField value={this.props.tmpBio} name="tmpBio" onChange={this.props.textInputChange} variant="outlined" placeholder="Your bio"/>
                            <br/>

                            <div>
                                <input
                                    accept="image/*"
                                    style={{display:'none'}}
                                    id="uploadButton"
                                    multiple
                                    type="file"
                                    onChange={ (e) => this.props.fileChangeHandler(e.target.files) }/>
                                <label htmlFor="uploadButton">
                                    <Button  variant="outlined" component="span">
                                        Select Profile Picture
                                    </Button>
                                </label>
                                <Button variant="outlined" onClick={this.props.addNewPost} component="span">
                                    Update
                                </Button>
                            </div>
                        </div>
                    </DialogContent>

                </Dialog>
            </div>
        )
    }
}

export default ProfileView