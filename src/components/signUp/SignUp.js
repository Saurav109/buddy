import React from "react"
import SignUpView from "./SignUpView"
import firebase from "firebase";

class SignUp extends React.Component{

    constructor(p){
        super(p);
        this.state={
            name:"",
            email:"",
            password:"",
            password2:"",
            loadingBar:false,
            showSnack:false,
            snackText:""
        };

        this.auth=firebase.auth();
        this.buttonClick=this.buttonClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.catchError=this.catchError.bind(this);
        this.closeSnack=this.closeSnack.bind(this);
        this.showSnack=this.showSnack.bind(this)
        this.backToLogin=this.backToLogin.bind(this)
    }

    render() {
        return (
            <div>
                <SignUpView
                    buttonClick={this.buttonClick}
                    handleChange={this.handleChange}
                    closeSnack={this.closeSnack}
                    signUp={this.signUp}
                    showSnack={this.state.showSnack}
                    loadingBar={this.state.loadingBar}
                    snackText={this.state.snackText}
                    backToLogin={this.backToLogin}
                />

            </div>

        );

    }

    buttonClick(){
        //if userManagement not put all field
        if(!this.state.email || !this.state.password){
            //
            this.state.email ? this.showSnack("please write down your password!!"):
                this.showSnack("please write down your email!!")
        } else
        {
            if(this.state.password===this.state.password2){
                //start loading...
                this.setState({loadingBar:true});
                //start login
                console.log("login start");
                this.auth.createUserWithEmailAndPassword(this.state.email,this.state.password)
                    .then(user=> {
                        this.setState({loadingBar:false});
                        console.log("new userManagement:",user.user.uid);

                        this.makeAnewAccountDetails(user.user)
                    }).catch(this.catchError);
            }else {
                this.showSnack("password didn't match!")
            }

        }
    }

    makeAnewAccountDetails(user){
        console.log("save email",user.email);

        const newUser={
            name:this.state.name,
            email:user.email,
            uid:user.uid,
            timeOfCreation:firebase.database.ServerValue.TIMESTAMP
        };

        firebase.database().ref("users").child(user.uid).set(newUser).then(
            ()=>{
                this.props.history.push("/");
                console.log("Done creating new profile!")
            }
        )
    }

    catchError(error){
        this.setState({loadingBar:false});

        let errorCode = error.code;
        let errorMessage = error.message;

        console.log("error code", errorCode);
        console.log("error message", errorMessage);
        this.showSnack(errorMessage)
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    backToLogin(){
        this.props.history.push("/login")
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

export default SignUp