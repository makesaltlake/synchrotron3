import React from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';

const signInUiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

firebase.initializeApp({
  // public facing key, doesn't need to be secured/hidden
  apiKey: "AIzaSyCnik-2d0Rx1Ik4Lc8pet8SCSlDhj0UkWk",
  authDomain: "synchrotron-msl.firebaseapp.com",
  databaseURL: "https://synchrotron-msl.firebaseio.com",
  projectId: "synchrotron-msl",
  storageBucket: "synchrotron-msl.appspot.com",
  messagingSenderId: "761275659055"
});

const Auth = props => <FirebaseAuth uiConfig={signInUiConfig} firebaseAuth={firebase.auth()} {...props} />;

export { firebase, Auth };
export const firestore = firebase.firestore(), storage = firebase.storage(), auth = firebase.auth();
