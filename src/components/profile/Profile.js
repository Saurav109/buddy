import React from "react"
import "./index.css"
import firebase from "../../fire";
import NotFound from "../notFound/NotFound";
import ProfileView from "./ProfileView";
import Storage from "../storage/Storage"
import Database from "../database/Database";

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            exist:true,             //if profile exist
            name:"",                //user name
            bio:null,               //user bio
            dialog:false,           //update profile dialog state
            tmpBio:null,            //tmp var for input box
            tmpName:null,           //tmp var for input box
            uid:null,               //user uid
            file:null,              //file from input
            uploadPercent:null,     //image addPost percent
            profileImageUrl:null,   //main url from database storage
            fileUrl:null            //local image file url
        };

        //if url gives uid of user
        if(props.match.params.id){
            this.state.uid=props.match.params.id
        }
        //if no uid given with url then load current user profile
        else {
            this.state.uid=firebase.auth().currentUser.uid
        }
        //all function
        this.getData=this.getData.bind(this);
        this.handleDialog=this.handleDialog.bind(this);
        this.fileChangeHandler=this.fileChangeHandler.bind(this);
        this.addNewPost=this.addNewPost.bind(this);
        this.doneUpload=this.doneUpload.bind(this);
        this.textInputChange=this.textInputChange.bind(this);
        this.updateUploadPercent=this.updateUploadPercent.bind(this);
        this.setImageUrl=this.setImageUrl.bind(this);
        this.sendText=this.sendText.bind(this);

        this.uploadHelper=new Storage();
        this.databaseHelper=new Database();
    }

    componentDidMount() {
        this.databaseHelper.getData("/users/"+this.state.uid,this.getData)
    }

    getData(snapshot){
        if(snapshot.val()){     //if profile exist
            this.setState({
                exist:true,
                name:snapshot.val().name,
                bio:snapshot.val().bio
            });
            this.uploadHelper.getImageUrl(this.state.uid,this.setImageUrl) //profile picture name always same as user uid

        }else {                 //if profile don't exist
            this.setState({
                exist:false
            })
        }
    }

    setImageUrl(url) {
        this.setState({
            profileImageUrl:url
        })
    }

    textInputChange(event){
        const text=event.target.value;
        this.setState({[event.target.name]:text})
    }

    addNewPost(){
        console.log("in the add new");
        if(this.state.file){
            this.setState({loadingBar:true});
            this.uploadHelper.uploadPicture(this.state.uid,this.state.file[0],this.updateUploadPercent,this.doneUpload)
        }
        if(this.state.tmpName){
            this.databaseHelper.setValue(this.state.tmpName,"/users/"+this.state.uid+"/name/",this.doneUpload(true))
        }
        if (this.state.tmpBio) {
            this.databaseHelper.setValue(this.state.tmpBio,"/users/"+this.state.uid+"/bio/",this.doneUpload(true))
        }
    }

    updateUploadPercent(percent){
        this.setState({uploadPercent:percent})
    }

    doneUpload(successful){
        if(successful){
            this.setState({
                dialog:false,
                uploadPercent:null,
                profileImageUrl:null
            });
            this.uploadHelper.getImageUrl(this.state.uid,this.setImageUrl) //profile picture name always same as user uid
        }
    }

    render() {
        return(
            this.state.exist?
                <ProfileView
                    sendText={this.sendText}
                    bio={this.state.bio}
                    name={this.state.name}
                    profileImageUrl={this.state.profileImageUrl}
                    fileUrl={this.state.fileUrl}
                    tmpName={this.state.tmpName}
                    tmpBio={this.state.tmpBio}
                    location={this.state.uid}
                    fileChangeHandler={this.fileChangeHandler}
                    dialog={this.state.dialog}
                    handleDialog={this.state.uid===firebase.auth().currentUser.uid?this.handleDialog:null}
                    addNewPost={this.addNewPost}
                    textInputChange={this.textInputChange}
                    loadingBar={this.state.loadingBar}
                    uploadPercent={this.state.uploadPercent}/>:
                <NotFound title="invalid profile"/>
        )
    }
    sendText(){
        this.databaseHelper.openNewConversation(this.state.uid,this.props)
    }

    //other react variable handler code________________________________
    handleDialog(value){
        this.setState({
            dialog:value && !this.state.dialog
        })
    }

    fileChangeHandler(file){
        console.log("selected image file:",file[0]);
        this.setState({file:file});

        const reader  = new FileReader();

        reader.onloadend = () => {
            this.setState({
                fileUrl: reader.result
            })
        };

        if (file[0]) {
            reader.readAsDataURL(file[0]);
            this.setState({
                fileUrl :reader.result
            })
        }
        else {
            this.setState({
                fileUrl: null
            })
        }
    }
}
export default Profile