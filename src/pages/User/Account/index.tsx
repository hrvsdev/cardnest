import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useSelector } from "@legendapp/state/react";
import { IconBrandGoogleFilled, IconLogout, IconTrash, IconUserCircle } from "@tabler/icons-react";

import { CreatePassword } from "@pages/Password/Create";
import { SignInWithPassword } from "@pages/Password/SignIn";
import { DeleteAccountBottomSheet } from "@pages/User/Account/DeleteAccountBottomSheet.tsx";
import { SignOutBottomSheet } from "@pages/User/Account/SignOutBottomSheet.tsx";

import { openBottomSheet } from "@components/BottomSheet/state.ts";
import { SubPageRoot } from "@components/Containers";
import { SettingsGroup } from "@components/Settings";
import { SettingsButton, SettingsItemContent, SettingsItemWrapper } from "@components/Settings/Button.tsx";

import { deleteUser, signInWithGoogle, signOut, userState } from "@data/user";
import { SignInResult } from "@data/user/types.ts";

import { toastAndLog } from "@utils/error.ts";

export function Account() {
	return (
		<Routes>
			<Route index element={<AccountPage />} />
			<Route path="password/create" element={<CreatePassword />} />
			<Route path="password/sign-in" element={<SignInWithPassword />} />
		</Routes>
	);
}

export const useUser = () => useSelector(userState);

export function AccountPage() {
	const navigate = useNavigate();

	const user = useUser();

	const [isSigningIn, setIsSigningIn] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const onSignInWithGoogle = async () => {
		try {
			setIsSigningIn(true);
			continueSignInByPassword(await signInWithGoogle());
		} catch (e) {
			toastAndLog(e);
		} finally {
			setIsSigningIn(false);
		}
	};

	const onSignOut = async () => {
		openBottomSheet(<SignOutBottomSheet />, async () => {
			await signOut();
		});
	};

	const onDeleteUser = async () => {
		openBottomSheet(<DeleteAccountBottomSheet />, async () => {
			try {
				setIsDeleting(true);
				await deleteUser();
			} catch (e) {
				toastAndLog(e);
				setIsDeleting(false);
			}
		});
	};

	const continueSignInByPassword = (result: SignInResult) => {
		if (result === "CREATE_PASSWORD") navigate("password/create");
		else if (result === "ENTER_PASSWORD") navigate("password/sign-in");
	};

	if (user == null) {
		return (
			<SubPageRoot title="Account" backLabel="Settings" className="space-y-6">
				<SettingsGroup title="Sign in" description={SIGN_IN_GOOGLE_DESC}>
					<SettingsButton Icon={IconBrandGoogleFilled} title="Sign in with Google" isLoading={isSigningIn} onClick={onSignInWithGoogle} />
				</SettingsGroup>
			</SubPageRoot>
		);
	}

	return (
		<SubPageRoot title="Account" backLabel="Settings" className="space-y-6">
			<SettingsGroup title="User" description={SIGN_OUT_DESC}>
				<SettingsItemWrapper>
					<SettingsItemContent Icon={IconUserCircle} title={user.fullName} />
				</SettingsItemWrapper>

				<SettingsButton Icon={IconLogout} title="Sign out of your account" onClick={onSignOut} />
			</SettingsGroup>

			<SettingsGroup title="Danger Zone" description={DELETE_ACCOUNT_DESC}>
				<SettingsButton Icon={IconTrash} title="Delete account" isLoading={isDeleting} isDanger={true} onClick={onDeleteUser} />
			</SettingsGroup>
		</SubPageRoot>
	);
}

const SIGN_IN_GOOGLE_DESC = "Sign in with your account to sync you data across devices.";
const SIGN_OUT_DESC = "Sign out of your account to remove your data from this device.";

const DELETE_ACCOUNT_DESC = "Delete your account to remove your data and account from this device and the server forever.";
