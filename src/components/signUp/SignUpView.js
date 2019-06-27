import React from "react"
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";


class SignUpView extends React.Component{

    render() {
        return (
            <div>
                <div className="card">
                    <Paper style={{padding:"23px"}}
                    elevation={2}>
                        <Typography
                            variant="h4">
                            Sign Up
                        </Typography>
                        <Typography variant="subtitle1">
                            enter a email and password to create an account
                        </Typography>
                        <br/><br/>
                        <TextField
                            style={{width:"100%"}}
                            variant="outlined"
                            name="name"
                            className="textInput"
                            placeholder="Name"
                            onChange={this.props.handleChange} /><br/><br/>
                        <TextField
                            style={{width:"100%"}}
                            variant="outlined"
                            name="email"
                            className="textInput"
                            placeholder="Email"
                            onChange={this.props.handleChange} /><br/><br/>
                        <Typography
                            variant="subtitle1">
                            Use ablest 6 digit password
                        </Typography><br/>
                        <TextField
                            style={{width:"100%"}}
                            variant="outlined"
                            type="password"
                            name="password"
                            className="textInput"
                            placeholder="Password"
                            onChange={this.props.handleChange}/><br/><br/>
                        <TextField
                            style={{width:"100%"}}
                            variant="outlined"
                            type="password"
                            name="password2"
                            className="textInput"
                            placeholder="Re Type Password"
                            onChange={this.props.handleChange}/><br/><br/>

                        <Button
                            name="signUp"
                            variant="contained"
                            fullWidth={false}
                            size="large"
                            color="secondary"
                            onClick={this.props.buttonClick}>
                            Sign Up
                        </Button>

                        <Button
                            name="signUp"
                            variant="text"
                            fullWidth={false}
                            size="large"
                            color="primary"
                            onClick={this.props.backToLogin}>
                            go back to login
                        </Button>
                    </Paper>
                    {this.props.loadingBar && <LinearProgress style={{height:"13px"}}/>}
                </div>
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
        );

    }
}

export default SignUpView