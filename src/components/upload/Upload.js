import React from "react"
import Button from '@material-ui/core/Button'
import {TextField} from "@material-ui/core";
import firebase from 'firebase'
import "./index.css"
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

class Upload extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            text:"",
            file:[],
            image_url:"",
            uploadPercent:0.0,
            showSnack:false
        };

        this.storageRef=firebase.storage().ref();
        this.databaseRef=firebase.database().ref("feed");
        //
        this.fileChange=this.fileChange.bind(this);
        this.uploadPost=this.uploadPost.bind(this);
        this.textInputChange=this.textInputChange.bind(this);
        this.addNewPost=this.addNewPost.bind(this);
        this.doneUpload=this.doneUpload.bind(this);
        this.updateUploadPercent=this.updateUploadPercent.bind(this)
        this.closeSnack=this.closeSnack.bind(this);

    }

    render() {
        return(
            <div className="upload">
                <Typography variant="h3">Compose new post</Typography><br/>
                {this.state.uploadPercent!==0.0 ? <LinearProgress value={this.state.uploadPercent} variant="determinate"/>:<div/>}
                <TextField
                    variant="outlined"
                    rows="5"
                    placeholder="Write Something ...."
                    fullWidth="true"
                    multiline="true"
                    onKeyPress={this.textInputChange}
                />
                <img style={{width:"200px"}} src={this.state.image_url}/>

                <div>
                    <input
                        accept="image/*"
                        style={{display:'none'}}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={ (e) => this.fileChange(e.target.files) }
                    />
                    <label htmlFor="contained-button-file">
                        <Button  variant="outlined" component="span">
                            Add photo
                        </Button>
                    </label>
                </div>
                <Button  variant="outlined" component="span"  onClick={this.addNewPost}>
                    Post
                </Button>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                    open={this.state.showSnack}
                    autoHideDuration={3000}
                    onClose={this.closeSnack}>
                    <SnackbarContent
                        style={{background:"#606060",fontSize:"17px"}}
                        message={<span id="message-id">status uploaded!!</span>}/>
                </Snackbar>
            </div>
        )
    }

    addNewPost(){
        //get a newKey
        this.databaseRef.push().then(snap=>{
            console.log("key",snap.key);
            let imageKey=snap.key;
            let postText=this.state.text;
            let imageFile=this.state.file[0];
            //
            if(postText && imageFile){
                //upload the image
                this.uploadPost(imageKey,postText,imageFile,this.doneUpload,this.updateUploadPercent)
            }else {
                console.log("write something")

            }
        })
    }

    doneUpload(){
        console.log("done uploading")
        this.setState({
            text:"",
            file:[],
            image_url:"",
            uploadPercent:0.0,
            showSnack:true
        })


    }
    updateUploadPercent(percent){
        this.setState({uploadPercent:percent})
    }

    uploadPost(imageName, text, file,doneUpload,uploadPercent){
        let uploadTask = this.storageRef.child(imageName).put(this.state.file[0]);

        uploadTask.on('state_changed', function(snapshot){
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            uploadPercent(progress)
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;

            }
        }, function(error) {
            console.log("error",error);
            doneUpload()
        }, function() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // console.log('File available at', downloadURL);
                let value ={
                    text:text,
                    time_stamp: firebase.database.ServerValue.TIMESTAMP,
                    image_url:imageName,
                    post_owner: firebase.auth().currentUser.uid
                };
                firebase.database().ref("/feed").push().set(value).then(()=>{

                    doneUpload()
                })

            });
        });

    }

    textInputChange(event){
        const text=event.target.value
        this.setState({text:text})
    }
    fileChange(file){
        console.log("file:",file[0])
        this.setState({file:file})

        const reader  = new FileReader();

        reader.onloadend = () => {
            this.setState({
                image_url: reader.result
            })
        }
        if (file[0]) {
            reader.readAsDataURL(file[0]);
            this.setState({
                image_url :reader.result
            })
        }
        else {
            this.setState({
                image_url: ""
            })
        }
    }

    closeSnack(){
        this.setState({
            showSnack:false
        })
    }
}
export default Upload