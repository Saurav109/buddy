import firebase from "../../fire";

class Database {
    constructor() {
        this.dataRef = firebase.database();
    }

    getData(node, onValueChange) {
        this.dataRef.ref(node).on("value", onValueChange)
    }

    setValue(value,node, successFunction, errorFunction) {
        this.dataRef.ref(node).set(value).then(successFunction).catch(errorFunction);
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

    getAllPost(uid, onValueChange) {
        let databaseNode = "/feed";
        let childName = "post_owner";

        if (uid) {
            this.dataRef.ref(databaseNode).orderByChild(childName).equalTo(uid).on("value", onValueChange);
        } else {
            this.dataRef.ref(databaseNode).on("value", onValueChange);
        }
    }

}

export default Database