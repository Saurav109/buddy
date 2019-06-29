import React from "react"
import firebase from "firebase"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import {CardHeader} from "@material-ui/core";
import avatarIcon from "../../resources/avaterIcon.png"
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import "./index.css"


class PostItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            image_url:"/",
            time:"",
            show:false,
            profileImage:null,
            profileName:null

        };

        this.database_ref=firebase.database().ref("/users/"+props.profile);
        this.storeRef=firebase.storage().ref();
        this.performLike=this.performLike.bind(this);
        this.loadImage=this.loadImage.bind(this);
        this.viewImage=this.viewImage.bind(this);
        this.getData=this.getData.bind(this)
        console.log("owner",props.profile)
    }

    render() {
        return(
            <Card className="postItem" onClick={this.viewImage}>
                <div >
                    {/*<img className="image_view" src={this.state.image_url} style={{width:"100%",background:"black"}} alt="image"/>*/}
                    <CardMedia image={this.state.image_url} style = {{ height: "100%", paddingTop: '100%',width:"100%",}} />
                    <div  style={{padding:"13px"}}>
                        <h1>{this.state.name & this.state.name}</h1>
                        <CardHeader

                            avatar={
                                <Avatar src={this.state.profileImage?this.state.profileImage:avatarIcon}/>
                            }

                            title={this.props.text}
                            subheader={this.state.time}>
                        </CardHeader>
                        <img style={{width:"100px"}} src={this.state.profileImage?this.state.profileImage:avatarIcon}/>
                    </div>
                </div>
                <Dialog
                    fullScreen="true"
                    open={this.state.show} onClose={this.viewImage}>
                    <img className="image_view" src={this.state.image_url}
                         alt={this.state.image_url}
                        // style={{height:"100%",width:"80%",backgroundSize:"auto"}}
                    />
                    <Button size="medium" variant="text" fullWidth="false" onClick={this.viewImage}>Close</Button>
                </Dialog>
            </Card>
          )
    }

    viewImage(){
        this.setState({
            show:!this.state.show
        })
    }

    componentDidMount() {
        this.database_ref.on("value",this.getData)


        this.loadImage()
        let date = new Date(this.props.time_stamp)
        let localTime = date.getHours()+":"+date.getMinutes()+" "+ date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
        this.setState({
            time: localTime
        })
    }
    getData(snapshot){

        if(snapshot.val()){
            console.log("profileImage",snapshot.val().profilePicture)
            console.log("name", snapshot.val().name)
            this.setState({
                profileImage:snapshot.val().profilePicture ? snapshot.val().profilePicture:null,
                profileName:snapshot.val().name ? snapshot.val().name:null
            })
        }else {
            console.log("snapshot is null",snapshot.val())
        }

    }

    loadImage(){
        let path=this.props.url
        console.log("ImageUrl",path);

        if(path){
            const ref = this.storeRef.child(path);
            ref.getDownloadURL().then(image_url=>{
                this.setState({
                    image_url:image_url
                })
            })
        }
        else {
            console.log("no image")
        }
    }

    performLike(){
        console.log(this.state.data_key);
        this.datebaseRef=firebase.database().ref("/list/"+this.props.key).child("like").set(true)
    }
}

export default PostItem