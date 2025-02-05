import { IconLockQuestion, IconLogout, IconPasswordMobilePhone } from "@tabler/icons-react";

import { ForgotPasswordBottomSheet } from "@pages/Password/ForgotPasswordBottomSheet.tsx";
import { SignOutBottomSheet } from "@pages/User/Account/SignOutBottomSheet.tsx";

import { openBottomSheet } from "@components/BottomSheet/state.ts";
import { SubPageRoot } from "@components/Containers";
import { SettingsGroup } from "@components/Settings";
import { SettingsButton, SettingsLink } from "@components/Settings/Button.tsx";
import { Show } from "@components/Show";

import { useHasCreatedPin } from "@data/auth";
import { signOut } from "@data/user";

export function UnlockWithPasswordHelp() {
	const hasCreatedPin = useHasCreatedPin();

	const onForgotPassword = () => {
		openBottomSheet(<ForgotPasswordBottomSheet context="UNLOCK" hasCreatedPin={hasCreatedPin} />, () => {
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
			<Show when={hasCreatedPin}>
				<SettingsGroup title="PIN">
					<SettingsLink title="Unlock using your PIN" to="/pin/unlock" Icon={IconPasswordMobilePhone} />
				</SettingsGroup>
			</Show>

			<SettingsGroup title="Password">
				<SettingsButton title="Forgot password?" onClick={onForgotPassword} Icon={IconLockQuestion} />
			</SettingsGroup>

			<SettingsGroup title="Sign out">
				<SettingsButton title="Sign out of your account" onClick={onSignOut} Icon={IconLogout} />
			</SettingsGroup>
		</SubPageRoot>
	);
}
