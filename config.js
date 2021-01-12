import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyD1HUpBTd8pWEhpMKZYtU7aaqZPCuZ79os",
  authDomain: "barter-system-6975b.firebaseapp.com",
  projectId: "barter-system-6975b",
  storageBucket: "barter-system-6975b.appspot.com",
  messagingSenderId: "888647222010",
  appId: "1:888647222010:web:358927df51e4f1f0fa3f43"
};
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
