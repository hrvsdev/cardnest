import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { IconLockOpenOff, IconPasswordMobilePhone } from "@tabler/icons-react";

import { CreatePin } from "@pages/CreatePin";
import { RemovePinDialog } from "@pages/User/components/RemovePinDialog";
import { SettingsGroup } from "@pages/User/components/Settings";
import { SettingsButton, SettingsLink } from "@pages/User/components/Settings/Button.tsx";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Show } from "@components/Show";

import { useHasCreatedPin, useRemovePin } from "@hooks/auth";
import { useRemoveCardsPin } from "@hooks/card/data.ts";

export function Security() {
	return (
		<Routes>
			<Route index element={<SecurityPage />} />
			<Route path="pin/create/*" element={<CreatePin />} />
		</Routes>
	);
}

function SecurityPage() {
	const hasCreatedPin = useHasCreatedPin();
	const removeCardsPin = useRemoveCardsPin();
	const removePin = useRemovePin();

	const [showRemovePasswordDialog, setShowRemovePasswordDialog] = useState(false);

	const removeAppPassword = () => {
		removeCardsPin().then(removePin);
	};

	return (
		<Fragment>
			<SubPageHeader title="Security" leftIconLabel="Settings" />
			<PageContainer className="space-y-6">
				<SettingsGroup title="Password">
					<SettingsLink to="pin/create" Icon={IconPasswordMobilePhone} title="Change password" />
				</SettingsGroup>
				<Show when={hasCreatedPin}>
					<SettingsGroup title="Danger zone" description={REMOVE_PASSWORD_DESC}>
						<SettingsButton
							onClick={() => setShowRemovePasswordDialog(true)}
							Icon={IconLockOpenOff}
							title="Remove app password"
							isDanger
						/>
					</SettingsGroup>
				</Show>
			</PageContainer>

			<RemovePinDialog
				show={showRemovePasswordDialog}
				onConfirm={removeAppPassword}
				onClose={() => setShowRemovePasswordDialog(false)}
			/>
		</Fragment>
	);
}

const CREATE_PASSWORD_DESC =
	"Creating a password will make your data private and secure. You will need to enter the password every time you open the app.";

const REMOVE_PASSWORD_DESC =
	"Removing your app password will make all your data accessible to anyone who has access to your device.";
