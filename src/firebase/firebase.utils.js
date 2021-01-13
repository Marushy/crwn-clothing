import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDHmTrwfaJ1Ld5OshSmPYRmdwNGjBclIaM",
    authDomain: "crwn-db-afa9e.firebaseapp.com",
    projectId: "crwn-db-afa9e",
    storageBucket: "crwn-db-afa9e.appspot.com",
    messagingSenderId: "35578285899",
    appId: "1:35578285899:web:6691645a765141999b62ce",
    measurementId: "G-NF8TJ8P7DM"

};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();   
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
