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
            show: false,
            profileImage: null,
            profileName: null,
            profileImageUrl: null,
            like: false

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
                    like={this.state.like}
                    profile={this.props.profile}
                    show={this.state.show}
                    time={this.props.time}
                    likes={this.props.likes}
                    performLike={this.performLike}
                    profileName={this.state.profileName}
                    text={this.props.text}
                    profileImageUrl={this.state.profileImageUrl}
                    fileUrl={this.state.fileUrl}
                    viewImage={this.viewImage}/> :
                <TextPostView
                    like={this.state.like}
                    profile={this.props.profile}
                    show={this.state.show}
                    time={this.props.time}
                    likes={this.props.likes}
                    profileImageUrl={this.state.profileImageUrl}
                    performLike={this.performLike}
                    profileName={this.state.profileName}
                    text={this.props.text}
                    viewImage={this.viewImage}/>
        )
    }

    gotoProfile() {
        this.props.history.push("/profile/" + this.props.profile)
    }

    componentDidMount() {
        //get user data
        this.databaseHelper.getData("/users/" + this.props.profile, this.getData);
        //get
        this.databaseHelper.getData("feed/" + this.props.postId + "/likedBy/" + firebase.auth().currentUser.uid,
            snap => {
                if (snap.val()) {
                    this.setState({
                        like: true
                    })
                } else {
                    this.setState({
                        like: false
                    })
                }
            });

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
        this.databaseHelper.addLike(this.props.postId);
    }
}

export default PostItem