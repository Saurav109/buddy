import React from "react"
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

class LoginView extends React.Component{

    render() {
        return(
            <div className="card">
                <Paper style={{padding:"23px"}}
                elevation={2}>
                    <Typography
                        variant="h4">
                        Login
                    </Typography>
                    <Typography variant="subtitle1">
                        enter your email and password to login
                    </Typography>
                    <br/><br/>
                    <TextField
                        style={{width:"100%"}}
                        variant="outlined"
                        name="email"
                        className="textInput"
                        placeholder="Email"
                        onChange={this.props.handleChange} /><br/><br/>
                    <TextField
                        style={{width:"100%"}}
                        variant="outlined"
                        type="password"
                        name="password"
                        className="textInput"
                        placeholder="Password"
                        onChange={this.props.handleChange}/><br/><br/>
                    <Button
                        name="login"
                        variant="contained"
                        fullWidth={false}
                        size="large"
                        color="primary"
                        onClick={this.props.buttonClick}>
                        Login
                    </Button>
                    <Button
                        name="signUp"
                        onClick={this.props.signUp}
                        variant="text"
                        fullWidth={false}
                        size="large"
                        color="secondary">
                        Sign up
                    </Button>

                </Paper>
                {this.props.loadingBar && <LinearProgress style={{height:"13px"}}/>}
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
                    open={this.props.showSnack}
                    autoHideDuration={3000}
                    onClose={this.props.closeSnack}>

                    <SnackbarContent
                        style={{background:"#e20e00",fontSize:"17px"}}
                        message={<span id="message-id">{this.props.snackText}</span>}/>
                </Snackbar>
            </div>
        )
    }
}

export default LoginView