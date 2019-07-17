import React from "react"
import firebase from 'firebase'
import "./index.css"
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Button from '@material-ui/core/Button'
import {TextField} from "@material-ui/core";
import Storage from "../storage/Storage";

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            file: [],
            fileUrl: null,
            uploadPercent: 0.0,
            showSnack: false,
            snackText: "",
            imageKey: null
        };

        this.databaseRef = firebase.database().ref("feed");
        //functions
        this.fileChange = this.fileChange.bind(this);
        this.textInputChange = this.textInputChange.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
        this.doneUpload = this.doneUpload.bind(this);
        this.updateUploadPercent = this.updateUploadPercent.bind(this);
        this.showSnack = this.showSnack.bind(this);
        this.closeSnack = this.closeSnack.bind(this);
        //
        this.uploadHelper = new Storage();
    }

    render() {
        return (
            <div className="upload">
                <Typography variant="h6">Compose new post</Typography><br/>
                {this.state.uploadPercent !== 0.0 ?
                    <LinearProgress value={this.state.uploadPercent} variant="determinate"/> : <div/>}
                <TextField
                    variant="outlined"
                    rows="3"
                    placeholder="Write Something ...."
                    fullWidth="true"
                    multiline="true"
                    value={this.state.text}
                    onChange={this.textInputChange}/>

                {this.state.fileUrl &&
                <div><img style={{width: "200px"}}
                          src={this.state.fileUrl}/>
                </div>}

                {!this.state.fileUrl &&
                <div>
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(e) => this.fileChange(e.target.files)}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="outlined" component="span">
                            Add photo
                        </Button>
                    </label>
                </div>}

                <Button variant="outlined" component="span" onClick={this.addNewPost}>
                    Post
                </Button>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                    open={this.state.showSnack}
                    autoHideDuration={3000}
                    onClose={this.closeSnack}>
                    <SnackbarContent
                        style={{background: "#606060", fontSize: "17px"}}
                        message={<span id="message-id">{this.state.snackText}</span>}/>
                </Snackbar>
            </div>
        )
    }

    addNewPost() {
        //get a newKey
        this.databaseRef.push().then(snap => {
            console.log("key", snap.key);
            let imageKey = snap.key;
            this.setState({imageKey: snap.key});
            let postText = this.state.text;
            let imageFile = this.state.file[0];
            //
            if (postText && imageFile) {
                //addPost the image
                this.showSnack("AddPost starting...");
                this.uploadHelper.uploadPicture(imageKey, imageFile, this.updateUploadPercent, this.doneUpload)
            } else if (postText && !imageFile) {
                let value = {
                    text: this.state.text,
                    time_stamp: firebase.database.ServerValue.TIMESTAMP,
                    post_owner: firebase.auth().currentUser.uid
                };
                firebase.database().ref("/feed").push().set(value)
                    .then(() => {
                        console.log("done uploading");
                        this.setState({
                            text: "",
                            file: [],
                            fileUrl: null,
                            uploadPercent: 0.0
                        });
                        this.showSnack("Status Uploaded!!")
                    });

            } else {
                console.log("write something");
                this.showSnack("write something")
            }
        })
    }

    doneUpload(successful) {
        if (successful) {
            let value = {
                text: this.state.text,
                time_stamp: firebase.database.ServerValue.TIMESTAMP,
                image_url: this.state.imageKey,
                post_owner: firebase.auth().currentUser.uid
            };

            firebase.database().ref("/feed").push().set(value)
                .then(() => {
                    console.log("done uploading");
                    this.setState({
                        text: "",
                        file: [],
                        fileUrl: null,
                        uploadPercent: 0.0
                    });
                    this.showSnack("Status Uploaded!!")
                });
        } else {
            this.showSnack("Error! please try again")
        }


    }

    fileChange(file) {
        console.log("file:", file[0]);
        this.setState({file: file});

        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                fileUrl: reader.result
            })
        };
        if (file[0]) {
            reader.readAsDataURL(file[0]);
            this.setState({
                fileUrl: reader.result
            })
        } else {
            this.setState({
                fileUrl: ""
            })
        }
    }

    textInputChange(event) {
        const text = event.target.value;
        this.setState({text: text})
    }

    updateUploadPercent(percent) {
        this.setState({uploadPercent: percent})
    }


    showSnack(text) {
        console.log("snack", text);
        this.setState({
            showSnack: true,
            snackText: text
        })
    }

    closeSnack() {
        this.setState({
            showSnack: false
        })
    }
}

export default AddPost