import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCGjj2iewKjxLmlQhvLVw9cSWZGIsuFtGo",
    authDomain: "crwn-db-1f506.firebaseapp.com",
    databaseURL: "https://crwn-db-1f506.firebaseio.com",
    projectId: "crwn-db-1f506",
    storageBucket: "crwn-db-1f506.appspot.com",
    messagingSenderId: "17195950406",
    appId: "1:17195950406:web:ff07e1ceac13e6eea14547"
  };

  export const createUserProfileDocument =async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        }
        catch(error)
        {
            console.log('error  createing user', error.message);
        }
    }

    return userRef;
} 

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;