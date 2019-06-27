//packages
import firebase from "firebase"

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyBP05WC5gqOchpt9jKmfDkOUgNLh_8e1is",
    authDomain: "buddy-84d11.firebaseapp.com",
    databaseURL: "https://buddy-84d11.firebaseio.com",
    projectId: "buddy-84d11",
    storageBucket: "buddy-84d11.appspot.com",
    messagingSenderId: "915308680512",
    appId: "1:915308680512:web:9da2f365220ff581"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase