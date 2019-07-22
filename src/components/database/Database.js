import firebase from "../../fire";

class Database {
    static CURRENT_USER_UID;

    constructor() {
        this.dataRef = firebase.database();
        this.uid=firebase.auth().currentUser;
        if(this.uid){
            Database.CURRENT_USER_UID=this.uid.uid;
        }
    }

    getData(node, onValueChange) {
        this.dataRef.ref(node).on("value", onValueChange)
    }

    getAllText(node, onValueChange) {
        this.dataRef.ref(node).on("value", onValueChange)
    }

    setValue(value, node, successFunction, errorFunction) {
        this.dataRef.ref(node).set(value).then(successFunction).catch(errorFunction);
    }

    getAllPost(uid, onValueChange) {
        let databaseNode = "/feed";
        let childName = "post_owner";

        if (uid) {
            this.dataRef.ref(databaseNode).orderByChild(childName).equalTo(uid).on("value", onValueChange);
        } else {
            this.dataRef.ref(databaseNode).on("value", onValueChange);
        }
    }

    getAllConversation(uid, getData) {
        let databaseNode = "/users/" + uid + "/conversation/";
        this.dataRef.ref(databaseNode).on("value",
            getData)
    }

    sendMessage(uid,text,success) {
        this.dataRef.ref("/conversation/"+uid).push().set(text).then(success)
    }

    openNewConversation(uid, props) {
        let convo = this.dataRef.ref("/users/" + firebase.auth().currentUser.uid + "/conversation/");
        let key;
        //check if convo exist
        convo.orderByChild("user_uid").equalTo(uid).once("value", convoVal => {
            if (!convoVal.val()) {
                let name;
                let myName;
                //get other user name
                this.dataRef.ref("/users/"+uid).once("value",user=>{
                    if(user.val()){
                        name=user.val().name;
                    }
                }).then(()=>{
                    //get a key
                    let otherUserRef = this.dataRef.ref("/users/" + uid + "/conversation/").push();
                    key = otherUserRef.key;
                    //set for me
                    convo.child(key).set({name:name,user_uid:uid})
                }).then(()=>{
                    //now set for other user
                    //get my user name
                    this.dataRef.ref("/users/"+firebase.auth().currentUser.uid).once("value",user=>{
                        if(user.val()){
                            myName=user.val().name;
                        }
                    }).then(()=>{
                        this.dataRef.ref("/users/"+uid+"/conversation/").child(key).set({name:myName,user_uid:firebase.auth().currentUser.uid})
                    }).then(()=>{
                        props.history.push("/inbox/"+key)
                    })
                });

            }else {
                convo.orderByChild("user_uid").equalTo(uid).once("value", convoVal => {
                    console.log("child",convoVal.node_.children_.root_.key);
                    props.history.push("/inbox/"+convoVal.node_.children_.root_.key)
                })

            }
        })
    }

    addLike(postId) {
        let uid = firebase.auth().currentUser.uid;
        let node = "feed/" + postId + "/likedBy/" + uid;
        let likeRef = this.dataRef.ref(node);
        //
        likeRef.once("value",
            snapshot => {
                if (snapshot.val() == null) {
                    likeRef.push(uid).set(true);
                    console.log("toggle true")
                } else {
                    likeRef.remove().then(() => {
                        console.log("toggle false")
                    });
                }
            })
    }

    static logout(success){
        firebase.auth().signOut().then(success);
    }
}

export default Database