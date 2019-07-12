import React from "react"
import firebase from "firebase"
import "../feed/index.css"
import UploadImage from "../addPost/UploadImage"
import ImagePostView from "./ImagePostView";
import TextPostView from "./TextPostView";


class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUrl: "/",
            time: "",
            show: false,
            profileImage: null,
            profileName: null,
            profileImageUrl: null

        };

        this.database_ref = firebase.database().ref("/users/" + props.profile);
        this.likedByRef = firebase.database().ref("feed/" + props.postId + "/likedBy/" + firebase.auth().currentUser.uid);
        this.performLike = this.performLike.bind(this);
        this.viewImage = this.viewImage.bind(this);
        this.getData = this.getData.bind(this);
        this.gotoProfile = this.gotoProfile.bind(this);

        this.uploadHelper = new UploadImage();
        if(!props.image_url){
            console.log("this is what i am looking for")
        }
    }

    render() {
        return (
            this.props.image_url?
                <ImagePostView
                    profile={this.props.profile}
                    show={this.state.show}
                    time={this.props.time}
                    likes={this.props.likes}
                    performLike={this.props.performLike}
                    profileName={this.state.profileName}
                    text={this.props.text}
                    profileImageUrl={this.state.profileImageUrl}
                    fileUrl={this.state.fileUrl}
                    viewImage={this.viewImage}/> :
                <TextPostView
                    profile={this.props.profile}
                    show={this.state.show}
                    time={this.props.time}
                    likes={this.props.likes}
                    profileImageUrl={this.state.profileImageUrl}
                    performLike={this.props.performLike}
                    profileName={this.state.profileName}
                    text={this.props.text}
                    viewImage={this.viewImage}/>
        )
    }

    gotoProfile() {
        this.props.history.push("/profile/" + this.props.profile)
    }

    componentDidMount() {
        this.database_ref.once("value", this.getData);
        //
        let date = new Date(this.props.time_stamp);
        let localTime = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        this.setState({
            time: localTime
        })
    }

    getData(snapshot) {
        if (snapshot.val()) {
            this.setState({
                profileImage: snapshot.val().profilePicture ? snapshot.val().profilePicture : null,
                profileName: snapshot.val().name ? snapshot.val().name : null
            });

            this.uploadHelper.getImageUrl(this.props.profile,
                (url) => {
                    this.setState({profileImageUrl: url})
                });
            this.uploadHelper.getImageUrl(this.props.image_url,
                (url) => {
                    this.setState({fileUrl: url});
                    console.log("image url", url)
                });
        }
    }

    viewImage() {
        this.setState({
            show: !this.state.show
        })
    }

    performLike() {
        let tmpRef = this.likedByRef;
        this.likedByRef.once("value").then(snapshot => {
            if (snapshot.val() == null) {
                tmpRef.push(firebase.auth().currentUser.uid).set(true);
                console.log("toggle true")
            } else {
                tmpRef.remove().then(() => {
                    console.log("toggle false")
                });
            }
        });
    }
}

export default PostItem