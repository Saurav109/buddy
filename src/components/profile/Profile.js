import React from "react"
import "./index.css"
import firebase from "../../fire";

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name:"Loading...",
            email:"Loading..."
        };
        // console.log("my props",this.props.match.params.id)
        this.profileRef=firebase.database().ref('users/'+this.props.match.params.id);
        this.getData=this.getData.bind(this)
    }
    render() {
        return(
            <div className="myDiv">
                <h1>Profile</h1>
                <h1>{this.state.name}</h1>
                <h1>{this.state.email}</h1>
            </div>
        )
    }

    componentDidMount() {
        this.profileRef.on("value",this.getData)
    }
    getData(snapshot){
        if(this.props.match.params.id){
            this.setState({
                name:snapshot.val().name,
                email:snapshot.val().email
            })
        }else {
            this.setState({
                name:"your name",
                email:"your email"
            })
        }

    }
}
export default Profile