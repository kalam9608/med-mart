import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBSCLnDsrFS7q5oKSQGPXFyYoRArqN2MIU",
    authDomain: "practo-app-a5112.firebaseapp.com",
    projectId: "practo-app-a5112",
    storageBucket: "practo-app-a5112.appspot.com",
    messagingSenderId: "63753511558",
    appId: "1:63753511558:web:5a335abe019b0d67362707",
    measurementId: "G-JSNCJSFNDK"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;