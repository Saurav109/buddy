import React from "react"
import PostItem from "../postItem/PostItem"
import Database from "../database/Database"
import "./index.css"
import {CircularProgress} from "@material-ui/core";

class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content_list: [],
            loading: true
        };

        this.databaseHelper = new Database();
        this.getData = this.getData.bind(this)
    }

    render() {
        return (
            <div>
                {this.state.loading &&
                <div style={{textAlign: "center", marginTop: "100px"}}>
                    <CircularProgress/>
                </div>
                }

                {
                    this.state.content_list.map(snapshot => {
                        return (
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
                    })
                }
            </div>
        )
    }

    componentDidMount() {
        this.databaseHelper.getAllPost(this.props.location, this.getData);
    }

    getData(snapshot) {
        this.setState({loading: false});
        //TODO:maybe i can use better function to not use a tmp variable
        let tmpContent = [];
        snapshot.forEach(val => {
            tmpContent.push({val: val.val(), key: val.key});
            return false;
        });

        this.setState({
            content_list: tmpContent.reverse()
        })
    }
}

export default Feed