import React from "react"
import firebase from "firebase"
import Storage from "../storage/Storage"
import ImagePostView from "../postView/ImagePostView";
import TextPostView from "../postView/TextPostView";
import Database from "../database/Database";

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUrl: "/",
            time: "",
            showFullscreen: false,
            profileImage: null,
            userName: null,
            profileImageUrl: null,
            isLiked: false

        };

        this.performLike = this.performLike.bind(this);
        this.viewImage = this.viewImage.bind(this);
        this.getData = this.getData.bind(this);
        this.gotoProfile = this.gotoProfile.bind(this);

        this.uploadHelper = new Storage();
        this.databaseHelper = new Database();

    }

    render() {
        return (
            this.props.image_url ?
                <ImagePostView
                    isLiked={this.state.isLiked}
                    userUid={this.props.userUid}
                    showFullscreen={this.state.showFullscreen}
                    time={this.props.time}
                    likes={this.props.likes}
                    performLike={this.performLike}
                    userName={this.state.userName}
                    text={this.props.text}
                    profileImageUrl={this.state.profileImageUrl}
                    fileUrl={this.state.fileUrl}
                    viewImage={this.viewImage}/> :
                <TextPostView
                    isLiked={this.state.isLiked}
                    userUid={this.props.userUid}
                    showfullscreen={this.state.showFullscreenw}
                    time={this.props.time}
                    likes={this.props.likes}
                    profileImageUrl={this.state.profileImageUrl}
                    performLike={this.performLike}
                    userName={this.state.userName}
                    text={this.props.text}
                    viewImage={this.viewImage}/>
        )
    }

    gotoProfile() {
        this.props.history.push("/profile/" + this.props.profile)
    }

    componentDidMount() {
        //get user data
        this.databaseHelper.getData("/users/" + this.props.userUid, this.getData);
        //check if current user liked
        this.databaseHelper.getData("feed/" + this.props.postId + "/likedBy/" + firebase.auth().currentUser.uid,
            snap => {
                if (snap.val()) {
                    this.setState({
                        isLiked: true
                    })
                } else {
                    this.setState({
                        isLiked: false
                    })
                }
            });
        //set time from timeStamp
        let date = new Date(this.props.time_stamp);
        let localTime = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        this.setState({
            time: localTime
        });

    }

    getData(snapshot) {
        if (snapshot.val()) {
            this.setState({
                profileImage: snapshot.val().profilePicture ? snapshot.val().profilePicture : null,
                userName: snapshot.val().name ? snapshot.val().name : null
            });

            //set avatar image
            this.uploadHelper.getImageUrl(this.props.userUid,
                (url) => {
                    this.setState({profileImageUrl: url})
                });
            //set post image
            this.uploadHelper.getImageUrl(this.props.image_url,
                (url) => {
                    this.setState({fileUrl: url});
                    console.log("image url", url)
                });
        }
    }

    viewImage() {
        this.setState({
            showFullscreen: !this.state.showFullscreen
        })
    }

    performLike() {
        this.databaseHelper.addLike(this.props.postId);
    }
}

export default PostItem