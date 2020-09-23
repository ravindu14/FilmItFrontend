import * as firebase from 'firebase';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCdNxQi566KOBdTj3_48EkJl6QKwRgp3l4",
    authDomain: "film-it-7b527.firebaseapp.com",
    databaseURL: "https://film-it-7b527.firebaseio.com",
    projectId: "film-it-7b527",
    storageBucket: "film-it-7b527.appspot.com",
    messagingSenderId: "717298499423",
    appId: "1:717298499423:web:80ddd95f3558fc9091c0ea"
}

firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}
