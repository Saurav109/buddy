import React from "react"
import firebase from "firebase"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import {CardHeader} from "@material-ui/core";
import avatarIcon from "../../avaterIcon.jpg"
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import "./index.css"


class PostItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            image_url:"/",
            time:"",
            show:false
        };

        this.storeRef=firebase.storage().ref();
        this.performLike=this.performLike.bind(this);
        this.loadImage=this.loadImage.bind(this);
        this.viewImage=this.viewImage.bind(this);
    }

    render() {
        return(
            <Card className="postItem" onClick={this.viewImage}>
                <div >
                    {/*<img className="image_view" src={this.state.image_url} style={{width:"100%",background:"black"}} alt="image"/>*/}
                    <CardMedia image={this.state.image_url} style = {{ height: "100%", paddingTop: '100%',width:"100%",}} />
                    <div  style={{padding:"13px"}}>
                        <CardHeader

                            avatar={
                                <Avatar src={avatarIcon}/>
                            }
                            title={this.props.text}
                            subheader={this.state.time}>
                        </CardHeader>
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
        this.loadImage()
        let date = new Date(this.props.time_stamp)
        let localTime = date.getHours()+":"+date.getMinutes()+" "+ date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
        this.setState({
            time: localTime
        })
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