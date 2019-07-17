import firebase from "../../fire";

class Storage {
    constructor() {
        this.storageRef = firebase.storage().ref();
    }

    uploadPicture(imageName, file, updateUploadPercent,doneUpload) {
        if(file){
            const uploadTask = this.storageRef.child(imageName).put(file);

            uploadTask.on("state_changed"
                , snapshot => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('AddPost is ' + progress + '% done');
                    updateUploadPercent(progress);

                }, error => {
                    console.log("error", error);
                    doneUpload(false)
                }
                , () => {
                    doneUpload(true);
                }
            );
        }
    }

    getImageUrl(imageName,setImageUrl) {
        const ref = this.storageRef.child(imageName);
        ref.getDownloadURL().then(image_url => {
            setImageUrl(image_url);
        });
    }


}

export default Storage