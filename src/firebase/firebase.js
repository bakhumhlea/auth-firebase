import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDJJ8BgUk7ZEiWFCV6fq1YBNyJy-T9nz0c",
    authDomain: "auth-firebase-f2f8d.firebaseapp.com",
    databaseURL: "https://auth-firebase-f2f8d.firebaseio.com",
    projectId: "auth-firebase-f2f8d",
    storageBucket: "auth-firebase-f2f8d.appspot.com",
    messagingSenderId: "909266518412"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};