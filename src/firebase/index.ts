import { initializeApp } from "firebase/app";
import { ref } from "firebase/database";

import { getAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";

const releaseConfig = {
	apiKey: "AIzaSyDeMdjawKJH3dZLfd0uy89Vbkz7CVlk4v8",
	authDomain: "cardnest-app.firebaseapp.com",
	databaseURL: "https://cardnest-app-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "cardnest-app",
	storageBucket: "cardnest-app.firebasestorage.app",
	messagingSenderId: "212184976594",
	appId: "1:212184976594:web:a4c57d201620f04264f10b"
};

const debugConfig = {
	apiKey: "AIzaSyBvd6AhnLqFJzEYFepdEv4uV7QScIbkqgA",
	authDomain: "cardnest-app-debug.firebaseapp.com",
	databaseURL: "https://cardnest-app-debug-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "cardnest-app-debug",
	storageBucket: "cardnest-app-debug.firebasestorage.app",
	messagingSenderId: "507053569962",
	appId: "1:507053569962:web:b07d139bef1a01d67cddd3"
};

const app = initializeApp(process.env.NODE_ENV === "development" ? debugConfig : releaseConfig);
const rtDb = getDatabase(app);

export const firebaseAuth = getAuth(app);
export const getReference = (...path: string[]) => ref(rtDb, path.join("/"));
