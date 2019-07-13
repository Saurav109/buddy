import React from 'react'
import firebase from "../../fire"
import "./index.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import avatarIcon from "../../resources/avatarIcon.png";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import UploadImage from "../addPost/UploadImage";


class Nav extends React.Component{
    constructor(props) {
        super(props);
        this.user=firebase.auth().currentUser;
        if(this.user!=null){
            this.state={
                user:this.user.uid,
                dialog:false,
                menuElement:null,
                profileImageUrl:null
            }
        }else {
            this.state={
                user:"null"
            }
        }
        this.logout=this.logout.bind(this);
        this.handleDialog=this.handleDialog.bind(this);
        this.handleMenuClick=this.handleMenuClick.bind(this);
        this.handleMenuClose=this.handleMenuClose.bind(this)

        this.imageLoader =new UploadImage();
    }


    render() {
        return(
            <div>
                <AppBar color="white" position="fixed">
                    <Toolbar >
                        <Link className="type" to={"/profile"}><Avatar  sizes="10px" src={this.state.profileImageUrl || avatarIcon}/></Link>
                        <Typography  variant="button" ><Link className="type" to="/">News Feed</Link></Typography>
                        <Typography  variant="button" ><Link className="type" to="/inbox">Inbox</Link></Typography>
                        <Typography className="type" style={{left:"0"}}  variant="button" onClick={this.handleMenuClick}>Menu</Typography>
                    </Toolbar>
                </AppBar>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.menuElement}
                    keepMounted transition disablePortal
                    open={Boolean(this.state.menuElement)}
                    onClose={this.handleMenuClick}>
                    <MenuItem onClick={this.handleMenuClose}>Setting</MenuItem>
                    <MenuItem onClick={this.handleDialog}>Logout</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>Close menu</MenuItem>
                </Menu>
                <Dialog
                    open={this.state.dialog} onClose={this.handleDialog}>
                    <DialogTitle>Are you sure you want to logout?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            If you click ok, you will logout from your account,
                            you can always login again with your password
                        </DialogContentText>
                        <Button variant="contained" onClick={this.logout}>logout</Button>
                        <Button variant="text" onClick={this.handleDialog}>cancel</Button>
                        <CssBaseline/>
                    </DialogContent>
                </Dialog>
            </div>
        )

    }

    componentDidMount() {

        this.imageLoader.getImageUrl(
            firebase.auth().currentUser.uid,
            url=>{this.setState({profileImageUrl:url})}
        )
    }

    logout(){
        firebase.auth().signOut().then(()=>{
            console.log("log out")
        });
        this.setState({dialog:true})

    }
    handleMenuClick(element){
        this.setState({
            menuElement:element.currentTarget
        })
    }

    handleMenuClose(){
        this.setState({
            menuElement:null
        })
    }

    handleDialog(){
        this.setState({dialog:!this.state.dialog})
    }
}

export default Nav