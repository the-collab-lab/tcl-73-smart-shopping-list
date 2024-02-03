import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDxgIhN6WjdFz8JvXe6zPf_Pssi-dHMO3s',
	authDomain: 'tcl-73-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-73-smart-shopping-list',
	storageBucket: 'tcl-73-smart-shopping-list.appspot.com',
	messagingSenderId: '517260855405',
	appId: '1:517260855405:web:b092e82cfb6d86c1181764',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
