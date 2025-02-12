import { useEffect } from "react";

import { observable, observe, when } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { User as FirebaseUser, GoogleAuthProvider, reauthenticateWithPopup, signInWithPopup } from "@firebase/auth";
import { firebaseAuth } from "@firebase/index.ts";

import { createAndSetPassword, resetLocalAuthData, resetRemoteAuthData, setLocalPassword } from "@data/auth";
import { authData, remoteAuthData } from "@data/auth/core.ts";
import { mergeCards, resetLocalCards, resetRemoteCards } from "@data/card";
import { appDataState } from "@data/index.ts";
import { SignInResult, User } from "@data/user/types.ts";

import { checkNotNull } from "@utils/conditions.ts";
import { ExtendedError } from "@utils/error.ts";

export const initialUserState = observable<User | null>(null);
export const userState = observable<User | null>(null);

export const isInitiallySignedIn = observable(() => initialUserState.get() != null);
export const isSignedIn = observable(() => userState.get() != null);

export const useIsSignedIn = () => useSelector(isSignedIn);

export function useCollectUser() {
	useEffect(() => {
		const unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
			const user = firebaseUserToUser(firebaseUser);

			observe(() => {
				initialUserState.set(user);
				userState.set(authData.password.get() ? user : null);
				appDataState.user.set(true);
			});
		});

		return () => unsubscribe();
	}, []);
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

export async function deleteUser() {
	const currentUser = checkNotNull(firebaseAuth.currentUser, "Sign-in again to delete user");

	try {
		await reauthenticateWithPopup(currentUser, new GoogleAuthProvider());
	} catch (e) {
		throw new ExtendedError("Failed to re-authenticate user", e);
	}

	try {
		await deleteRemoteData();
		deleteLocalData();
		await currentUser.delete();
	} catch (e) {
		throw new ExtendedError("Failed to delete user", e);
	}
}

function deleteLocalData() {
	resetLocalCards();
	resetLocalAuthData();
}

async function deleteRemoteData() {
	await resetRemoteCards();
	await resetRemoteAuthData();
}

function firebaseUserToUser(user: FirebaseUser | null): User | null {
	if (user == null) return null;

	const fullName = user.displayName ?? "Anonymous";
	return { uid: user.uid, name: fullName.split(" ")[0], fullName };
}
