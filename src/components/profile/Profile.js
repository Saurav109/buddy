import React from "react"
import "./index.css"
import firebase from "../../fire";
import {CssBaseline} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import avaterIcon from "../../resources/avaterIcon.png"
import Feed from "../feed/Feed";

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name:"Loading...",
            email:"Loading...",
            image:null
        };
        // console.log("my props",this.props.match.params.id)
        this.profileRef=firebase.database().ref('users/'+this.props.match.params.id);
        this.getData=this.getData.bind(this)
    }
    render() {
        return(
            <div  style={{textAlign:"center",
                left:"0",
                right:"0",
                margin:"auto",
                width:"70%"
            }}>

                <CssBaseline/>
                <div>
                    <GridList
                        cellHeight="100%"
                        cols={2}>
                        <Grid>
                            <br/>
                            <br/>
                            <br/>
                            <div style={{margin:"27px",position:"fixed",width:"30%"}}>
                                <Card elevation={0} >
                                    <CardMedia image={avaterIcon} width="100%"  style = {{ height: "100%", paddingTop: '100%',width:"100%",borderRadius:"50%"}} />
                                </Card>
                                <Typography variant="h3">{this.state.name}</Typography>
                                <Typography variant="subtitle2">{this.state.email}</Typography>
                                <Typography variant="h6">This is my bio</Typography>

                            </div>

                        </Grid>
                        <Grid>
                            <br/>
                            <br/>
                            <Feed/>
                        </Grid>
                    </GridList>
                </div>

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