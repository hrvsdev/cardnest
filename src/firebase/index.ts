import { initializeApp } from "firebase/app";
import { ref } from "firebase/database";

import { getAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyBvd6AhnLqFJzEYFepdEv4uV7QScIbkqgA",
	authDomain: "cardnest-app-debug.firebaseapp.com",
	projectId: "cardnest-app-debug",
	storageBucket: "cardnest-app-debug.firebasestorage.app",
	messagingSenderId: "507053569962",
	appId: "1:507053569962:web:b07d139bef1a01d67cddd3"
};

const app = initializeApp(firebaseConfig);
const rtDb = getDatabase(app, "https://cardnest-app-debug-default-rtdb.asia-southeast1.firebasedatabase.app");

export const firebaseAuth = getAuth(app);
export const getReference = (...path: string[]) => ref(rtDb, path.join("/"));
