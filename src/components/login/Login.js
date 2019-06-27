import React from "react"
import "./index.css"
import firebase from "../../fire"
import LoginView from "./LoginView"

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            email:"",
            password:"",
            loadingBar:false,
            showSnack:false,
            snackText:""
        };

        this.auth=firebase.auth();
        this.buttonClick=this.buttonClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
        //
        this.signUp=this.signUp.bind(this);
        this.catchError=this.catchError.bind(this);
        //
        this.closeSnack=this.closeSnack.bind(this);
        this.showSnack=this.showSnack.bind(this);
    }


    render() {
        return(
            <LoginView
                buttonClick={this.buttonClick}
                handleChange={this.handleChange}
                closeSnack={this.closeSnack}
                signUp={this.signUp}
                showSnack={this.state.showSnack}
                loadingBar={this.state.loadingBar}
                snackText={this.state.snackText}
            />
        )
    }

    buttonClick(){
        //if userManagement not put all field
        if(!this.state.email || !this.state.password){
            //
            this.state.email ? this.showSnack("please write down your password!!"):
                this.showSnack("please write down your email!!")
        } else
        {
            //start loading...
            this.setState({loadingBar:true});
            //start login
            console.log("login start");
            this.auth.signInWithEmailAndPassword(this.state.email,this.state.password)
                .then(()=> {
                    //
                    this.setState({loadingBar:false})
                    this.props.history.push("/home");
                    //
                }).catch(this.catchError);
        }
    }

    catchError(error){
        //stop loading
        this.setState({loadingBar:false});
        //
        let errorCode = error.code;
        let errorMessage = error.message;
        //
        console.log("error code", errorCode);
        console.log("error message", errorMessage);
        //show   error snack
        this.showSnack(errorMessage)
    }

    signUp(){
        this.props.history.push("/signUp")
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    showSnack(text){
        this.setState({
            showSnack:true,
            snackText:text
        })
    }
    closeSnack(){
        this.setState({
            showSnack:false
        })
    }
}
export default Login