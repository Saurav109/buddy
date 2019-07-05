import React from "react"
import firebase from "../../fire"
import PostItem from "./PostItem"
import "./index.css"
import {CircularProgress} from "@material-ui/core";

class Feed extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            content_list:[],
            loading:true
        };
        if(props.location){
            this.database_ref=firebase.database().ref(props.location);
        }else {
            this.database_ref=firebase.database().ref('feed');
        }
        this.getData=this.getData.bind(this)

    }

    render() {
        return(<div >
            {this.state.loading ?
                <div style={{textAlign:"center",marginTop:"100px"}}>
                    <CircularProgress/>
                </div>:
                <div/>
            }
            {this.state.content_list.map(snapshot => {
                return(
                    <PostItem text={snapshot.val().text}
                              url={snapshot.val().image_url}
                              time_stamp={snapshot.val().time_stamp}
                              child_key={snapshot.key}
                              show={this.props.show}
                              profile={snapshot.val().post_owner}
                    />
                )
            })}

        </div>)
    }

    componentDidMount() {
        this.database_ref.on("child_added",this.getData)
    }

    getData(snapshot){
        this.setState({loading:false});
        this.setState(prev_state=>{
            let new_content_list=prev_state.content_list;
            new_content_list.push(snapshot);
            return{
                content_list: new_content_list
            }
        })
    }

}
export default Feed