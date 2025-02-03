import { useEffect } from "react";

import { observable, when } from "@legendapp/state";
import { useObserve } from "@legendapp/state/react";

import { User as FirebaseUser, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { firebaseAuth } from "@firebase/index.ts";

import { createAndSetPassword, resetLocalAuthData, setLocalPassword } from "@data/auth";
import { authData, remoteAuthData } from "@data/auth/core.ts";
import { mergeCards, resetLocalCards } from "@data/card";
import { appDataState } from "@data/index.ts";
import { SignInResult, User } from "@data/user/types.ts";

import { ExtendedError } from "@utils/error.ts";

export const initialUserState = observable<User | null>(null);
export const userState = observable<User | null>(null);

export const isInitiallySignedIn = observable(() => initialUserState.get() != null);
export const isSignedIn = observable(() => userState.get() != null);

export function useCollectUser() {
	useEffect(() => {
		const unsubscribe = firebaseAuth.onAuthStateChanged((user) => initialUserState.set(firebaseUserToUser(user)));
		return () => unsubscribe();
	}, []);

	useObserve(async () => {
		const initialUser = initialUserState.get();
		const passwordData = authData.password.get();

		userState.set(passwordData ? initialUser : null);
		appDataState.user.set(true);
	});
}

export async function signInWithGoogle(): Promise<SignInResult> {
	try {
		await firebaseAuth.signOut();
		await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
	} catch (e) {
		throw new ExtendedError("Failed to sign in with Google", e);
	}

	await when(appDataState.remoteAuth);
	const isUserNew = remoteAuthData.password.get() == null;

	return isUserNew ? "CREATE_PASSWORD" : "ENTER_PASSWORD";
}

export async function continueSignInByCreatingPassword(password: string) {
	await createAndSetPassword(password);
	await when(isSignedIn);

	appDataState.areCardsMerging.set(true);
	await mergeCards();
}

export async function continueSignInByEnteringPassword(password: string) {
	await setLocalPassword(password);
	await when(isSignedIn);

	appDataState.areCardsMerging.set(true);
	await mergeCards();
}

export async function signOut() {
	deleteLocalData();
	await firebaseAuth.signOut();
}

function deleteLocalData() {
	resetLocalCards();
	resetLocalAuthData();
}

function firebaseUserToUser(user: FirebaseUser | null): User | null {
	if (user == null) return null;

	const fullName = user.displayName ?? "Anonymous";
	return { uid: user.uid, name: fullName.split(" ")[0], fullName };
}
