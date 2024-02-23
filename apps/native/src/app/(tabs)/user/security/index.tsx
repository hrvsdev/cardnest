import { useState } from "react";
import { useRouter } from "expo-router";

import { SettingsGroup } from "components/Settings";
import { IconLockOpenOff, IconPasswordMobilePhone } from "tabler-icons-react-native";

import { PageContainer, PageRoot } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { SettingsButton } from "@components/Settings/Button.tsx";
import { Show } from "@components/Show";

export default function Page() {
	const hasCreatedPin = false;
	const router = useRouter();

	// @ts-ignore
	const [showRemovePasswordDialog, setShowRemovePasswordDialog] = useState(false);

	// @ts-ignore
	const navigateToCreatePin = () => {};

	// @ts-ignore
	const removeAppPassword = async () => {};

	const onCreatePinClick = () => {
		router.navigate("/pin/create");
	};

	// @ts-ignore
	const onRemovePasswordConfirmClick = () => {};

	return (
		<PageRoot>
			<SubPageHeader title="Security" leftIconLabel="Settings" />
			<PageContainer style={{ gap: 24 }}>
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
			</PageContainer>
		</PageRoot>
	);
}

const CREATE_PASSWORD_DESC =
	"Creating a password will make your data private and secure. You will need to enter the password every time you open the app.";

const REMOVE_PASSWORD_DESC =
	"Removing your app password will make all your data accessible to anyone who has access to your device.";
