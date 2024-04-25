import { useState } from "react";
import { useRouter } from "expo-router";

import { SettingsGroup } from "components/Settings";
import { IconLockOpenOff, IconPasswordMobilePhone } from "tabler-icons-react-native";

import RemovePinDialog from "./remove-pin.tsx";

import { SubPageRoot } from "@components/Containers";
import { SettingsButton } from "@components/Settings/Button.tsx";
import { Show } from "@components/Show";

import { useSetAfterPinVerified } from "@libs/hooks/src/actions";
import { useHasCreatedPin, useRemovePin } from "@libs/hooks/src/auth";
import { useRemoveCardsPin } from "@libs/hooks/src/card/data.ts";

export default function SecurityPage() {
	const router = useRouter();

	const hasCreatedPin = useHasCreatedPin();
	const removeCardsPin = useRemoveCardsPin();
	const removePin = useRemovePin();
	const setAfterPinVerified = useSetAfterPinVerified();

	const [showRemovePasswordDialog, setShowRemovePasswordDialog] = useState(false);

	const navigateToCreatePin = () => {
		router.navigate("/pin/create");
	};

	const removeAppPassword = async () => {
		await removeCardsPin();
		removePin();

		router.navigate("/user/security");
	};

	const onCreatePinClick = () => {
		if (hasCreatedPin) {
			setAfterPinVerified(() => navigateToCreatePin);
			router.navigate("/pin/verify");
		} else {
			navigateToCreatePin();
		}
	};

	const onRemovePasswordConfirmClick = () => {
		setShowRemovePasswordDialog(false);
		setAfterPinVerified(() => removeAppPassword);
		router.navigate("/pin/verify");
	};

	return (
		<SubPageRoot gap={24} title="Security" leftIconLabel="Settings">
			<SettingsGroup title="Password" description={hasCreatedPin ? "" : CREATE_PASSWORD_DESC}>
				<SettingsButton
					isFirst
					isLast
					title={hasCreatedPin ? "Change password" : "Create password"}
					onPress={onCreatePinClick}
					Icon={IconPasswordMobilePhone}
				/>
			</SettingsGroup>
			<Show when={hasCreatedPin}>
				<SettingsGroup title="Danger zone" description={REMOVE_PASSWORD_DESC}>
					<SettingsButton
						isFirst
						isLast
						onPress={() => setShowRemovePasswordDialog(true)}
						Icon={IconLockOpenOff}
						title="Remove app password"
						isDanger
					/>
				</SettingsGroup>
			</Show>

			<RemovePinDialog
				show={showRemovePasswordDialog}
				onConfirm={onRemovePasswordConfirmClick}
				onClose={() => setShowRemovePasswordDialog(false)}
			/>
		</SubPageRoot>
	);
}

const CREATE_PASSWORD_DESC =
	"Creating a password will make your data private and secure. You will need to enter the password every time you open the app.";

const REMOVE_PASSWORD_DESC =
	"Removing your app password will make all your data accessible to anyone who has access to your device.";
