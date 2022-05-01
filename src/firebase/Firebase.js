// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import 'firebase/storage'
import 'firebase/app'
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBQqW70wXbpbkPz5g74QZHlPgcPXUQoH_U",
	authDomain: "test-20cb5.firebaseapp.com",
	databaseURL:
		"https://test-20cb5-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "test-20cb5",
	storageBucket: "test-20cb5.appspot.com",
	messagingSenderId: "526789499552",
	appId: "1:526789499552:web:f7b85999075fc1977bc7c5",
	measurementId: "G-VL0ZN5SC0Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebaseStorage = getStorage(app);