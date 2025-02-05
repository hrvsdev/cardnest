import { IconLockPassword, IconLockQuestion, IconLogout } from "@tabler/icons-react";

import { ForgotPinBottomSheet } from "@pages/Pin/ForgotPinBottomSheet";
import { SignOutBottomSheet } from "@pages/User/Account/SignOutBottomSheet";

import { openBottomSheet } from "@components/BottomSheet/state";
import { SubPageRoot } from "@components/Containers";
import { SettingsGroup } from "@components/Settings";
import { SettingsButton, SettingsLink } from "@components/Settings/Button";
import { Show } from "@components/Show";

import { useHasCreatedPassword } from "@data/auth";
import { signOut, useIsSignedIn } from "@data/user";

export function UnlockWithPinHelp() {
	const hasCreatedPassword = useHasCreatedPassword();
	const isSignedIn = useIsSignedIn();

	const onForgotPin = () => {
		openBottomSheet(<ForgotPinBottomSheet context="UNLOCK" hasCreatedPassword={hasCreatedPassword} />, () => {
			// Nothing
		});
	};

	const onSignOut = () => {
		openBottomSheet(<SignOutBottomSheet />, async () => {
			await signOut();
		});
	};

	return (
		<SubPageRoot title="Help" className="space-y-6">
			<Show when={hasCreatedPassword}>
				<SettingsGroup title="Password">
					<SettingsLink title="Unlock using your password" to="/password/unlock" Icon={IconLockPassword} />
				</SettingsGroup>
			</Show>

			<SettingsGroup title="PIN">
				<SettingsButton title="Forgot PIN?" onClick={onForgotPin} Icon={IconLockQuestion} />
			</SettingsGroup>

			<Show when={isSignedIn}>
				<SettingsGroup title="Sign out">
					<SettingsButton title="Sign out of your account" onClick={onSignOut} Icon={IconLogout} />
				</SettingsGroup>
			</Show>
		</SubPageRoot>
	);
}
