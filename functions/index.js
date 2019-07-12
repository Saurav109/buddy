const functions = require('firebase-functions');
// // The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp();

//count all node in likedBy then write count in likes node
exports.countLikes = functions.database.ref('/feed/{pushId}/likedBy')
    .onWrite((change, context) => {
        // Exit when the data is deleted.
        if (!change.after.exists()) {
            return null;
        }
        // Grab the current value of what was written to the Realtime Database.
        const data = change.after.val();
        const count = Object.keys(data).length;

        return change.after.ref.parent.child("likes").set(count);
    });

//set likes to zero if likedBy node is deleted
exports.setZeroLike = functions.database.ref('/feed/{pushId}/likedBy')
    .onDelete(event => {
        const ref = event.ref.parent.child("likes");
        return ref.set(0);
    });
