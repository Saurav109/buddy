import React from "react"
import firebase from "../../fire"
import PostItem from "../postItem/PostItem"
import "./index.css"
import {CircularProgress} from "@material-ui/core";

class Feed extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            content_list:[],
            loading:true
        };

        console.log("location props ",props.location);

        if(props.location){
            this.database_ref=firebase.database().ref('feed').orderByChild("post_owner").equalTo(props.location);
        }else {
            this.database_ref=firebase.database().ref('feed');
        }
        this.getData=this.getData.bind(this)

    }

    render() {
        return(<div>
            {this.state.loading &&
                <div style={{textAlign:"center",marginTop:"100px"}}>
                    <CircularProgress/>
                </div>
            }
            {this.state.content_list.map(snapshot => {
                if(snapshot.val.image_url){
                    console.log("my url",snapshot.val.image_url);
                }
                return(
                    <PostItem text={snapshot.val.text}
                              image_url={snapshot.val.image_url}
                              time_stamp={snapshot.val.time_stamp}
                              child_key={snapshot.key}
                              show={this.props.show}
                              profile={snapshot.val.post_owner}
                              postId={snapshot.key}
                              likes={snapshot.val.likes}
                              key={snapshot.key}
                              history={this.props.history}
                    />
                )
            })}

        </div>)
    }

    componentDidMount() {
        this.database_ref.on("value",this.getData);
        console.log("start fetching data")
    }

    getData(snapshot){
        console.log("loading new data");
        this.setState({loading:false});

        let tmpContent =[];
        snapshot.forEach(val=>{
            tmpContent.push({val:val.val(),key:val.key});
            return false;
        });

        this.setState({
            content_list:tmpContent.reverse()
        })
    }
}
export default Feed