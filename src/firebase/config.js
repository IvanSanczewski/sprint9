import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAU62biEwIlfHFmNqDZ2xQE33qrZPE6lIw",
    authDomain: "library-users-50c2e.firebaseapp.com",
    projectId: "library-users-50c2e",
    storageBucket: "library-users-50c2e.appspot.com",
    messagingSenderId: "184041678870",
    appId: "1:184041678870:web:7fffd46a9942f70624ed37"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)
  
  //init firebase service
  const projectFirestore = firebase.firestore()

  export { projectFirestore }
