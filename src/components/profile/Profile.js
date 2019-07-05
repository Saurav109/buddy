import React from "react"
import "./index.css"
import firebase from "../../fire";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import avaterIcon from "../../resources/avaterIcon.png"
import Feed from "../feed/Feed";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name:"",
            email:"",
            profilePicture:null,
            dialog:false,
            file:[]
        };
        this.storageRef=firebase.storage().ref();
        this.profileRef=firebase.database().ref('users/'+firebase.auth().currentUser.uid);
        this.getData=this.getData.bind(this);
        this.handleDialog=this.handleDialog.bind(this);
        this.uploadProfilePicture=this.uploadProfilePicture.bind(this);
        this.fileChange=this.fileChange.bind(this);
        this.addNewPost=this.addNewPost.bind(this);
        this.doneUpload=this.doneUpload.bind(this)
    }


    render() {
       return(
           <div>
               <br/><br/><br/><br/>
               <Grid container
                     style={{
                         left:"0",
                         right:"0",
                         margin:"auto",
                         width:"80%"}}>
                   <Grid item xs={5} >
                       <div style={{position:"fixed",transform:"none"}}>
                           <CardMedia onClick={this.props.match.params.id?null:this.handleDialog} image={this.state.profilePicture?this.state.profilePicture:avaterIcon}
                                      width="100%"  style = {{ height: "100%", paddingTop: '100%',width:"100%",borderRadius:"50%"}} />
                           <Typography variant="h4">{this.state.name}</Typography>
                           <Typography variant="subtitle2">{this.state.email}</Typography>
                           <TextField />
                       </div>
                   </Grid>
                   <Grid item xs={6}>
                       <Typography variant="h5">All post</Typography>
                       <Feed location={"/users/"+firebase.auth().currentUser.uid+"/posts/"}/>
                   </Grid>

               </Grid>
               <Dialog
                   open={this.state.dialog} onClose={this.handleDialog}>
                   <DialogTitle>Update profile picture</DialogTitle>
                   <DialogContent>
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
                                   yes
                               </Button>
                           </label>
                           <Button  variant="outlined" component="span"  onClick={this.addNewPost}>
                               Post
                           </Button>
                           <Button variant="text" onClick={this.handleDialog}>cancel</Button>
                       </div>
                       <CssBaseline/>
                   </DialogContent>
               </Dialog>
           </div>
       )
    }

    componentDidMount() {
        this.profileRef.on("value",this.getData)
    }
    getData(snapshot){
        this.setState({
            name:snapshot.val().name,
            email:snapshot.val().email,
            profilePicture:snapshot.val().profilePicture
        })
        // if(this.props.match.params.id){
        //     this.setState({
        //         name:snapshot.val().name,
        //         email:snapshot.val().email,
        //         profilePicture:snapshot.val().profilePicture
        //     })
        // }else {
        //     this.setState({
        //         name:"your name",
        //         email:"your email"
        //     })
        // }
    }


    fileChange(file){
        console.log("file:",file[0]);
        this.setState({file:file});

        const reader  = new FileReader();

        reader.onloadend = () => {
            this.setState({
                image_url: reader.result
            })
        };

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
    addNewPost(){
        console.log("in the add new");
        if(this.state.file[0]){
            let imageKey=firebase.auth().currentUser.uid;
            let imageFile=this.state.file[0];
            this.uploadPicture(imageKey,imageFile,this.doneUpload,this.updateUploadPercent)

        }
    }
    uploadPicture(imageName, file,doneUpload,uploadPercent){

        let uploadTask = this.storageRef.child(imageName).put(this.state.file[0]);
        console.log("started")
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
            doneUpload(null)
        }, function() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                doneUpload(downloadURL)
                console.log(downloadURL)
            });
        });
    }


    updateUploadPercent(percent){
        // this.setState({uploadPercent:percent})

    }

    doneUpload(url){
        if(url){
            this.profileRef.child("profilePicture").set(url)
        }
        // this.setState({
        //     file:[],
        //     image_url:"",
        //     uploadPercent:0.0
        // })
        // this.showSnack("Status Uploaded!!")

    }
    uploadProfilePicture(){


    }

    handleDialog(){
        this.setState({dialog:!this.state.dialog})
    }
}
export default Profile