import React from 'react'
import "./index.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import avatarIcon from "../../resources/avatarIcon.png";
import Storage from "../storage/Storage";
import Database from "../database/Database";
import TextField from "@material-ui/core/TextField";

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialog: false,
            menuElement: null,
            profileImageUrl: null
        };

        this.logout = this.logout.bind(this);
        this.handleDialog = this.handleDialog.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);


        this.storageHelper = new Storage();
    }


    render() {
        return (
            <div>
                <AppBar color="default" position="fixed">
                    <Toolbar>
                        <Link className="navigationItem" to={"/profile"}>
                            <Avatar sizes="10px"
                                    src={this.state.profileImageUrl || avatarIcon}/>
                        </Link>
                        <Typography variant="button">
                            <Link className="navigationItem" to="/">
                                Feed
                            </Link>
                        </Typography>
                        <Typography variant="button">
                            <Link className="navigationItem" to="/inbox">
                                Inbox
                            </Link>
                        </Typography>
                        <Typography className="navigationItem"
                                    variant="button"
                                    onClick={this.handleMenuClick}>
                            Menu
                        </Typography>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.menuElement}
                            open={Boolean(this.state.menuElement)}
                            onClose={this.handleMenuClose}>
                            <MenuItem onClick={this.handleMenuClose}>
                                Setting
                            </MenuItem>
                            <MenuItem onClick={this.handleDialog}>
                                Logout
                            </MenuItem>
                        </Menu>
                        <TextField margin={"0"} placeholder="Search..."/>
                    </Toolbar>
                </AppBar>

                <Dialog
                    open={this.state.dialog}
                    onClose={this.handleDialog}>
                    <DialogTitle>Are you sure you want to logout?</DialogTitle>
                    <div className="dialogStyle">
                        <Typography>
                            If you click ok, you will logout from your account,
                            you can always login again with your password
                        </Typography>
                        <br/>
                        <Button variant="contained" onClick={this.logout}>logout</Button>
                        <Button variant="text" onClick={this.handleDialog}>cancel</Button>
                    </div>
                </Dialog>
            </div>
        )

    }

    componentDidMount() {

        this.storageHelper.getImageUrl(
            Database.CURRENT_USER_UID,
            url => {
                this.setState({profileImageUrl: url})
            }
        )
    }

    logout() {
        Database.logout(() => {
            this.setState({dialog: true})
        })
    }

    handleMenuClick(element) {
        this.setState({
            menuElement: element.currentTarget
        })
    }

    handleMenuClose() {
        this.setState({
            menuElement: null
        })
    }

    handleDialog() {
        this.setState({dialog: !this.state.dialog});
        //also close the menu
        this.handleMenuClose()
    }
}

export default Nav