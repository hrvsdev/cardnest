import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { IconLockOpenOff, IconPasswordMobilePhone } from "@tabler/icons-react";

import { CreatePin } from "@pages/CreatePin";
import { RemovePinDialog } from "@pages/User/components/RemovePinDialog";
import { SettingsGroup } from "@pages/User/components/Settings";
import { SettingsButton, SettingsLink } from "@pages/User/components/Settings/Button.tsx";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { useRemovePin } from "@hooks/auth";
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
				<SettingsGroup title="Danger zone" description={DESC}>
					<SettingsButton
						onClick={() => setShowRemovePasswordDialog(true)}
						Icon={IconLockOpenOff}
						title="Remove app password"
						isDanger
					/>
				</SettingsGroup>
			</PageContainer>

			<RemovePinDialog
				show={showRemovePasswordDialog}
				onConfirm={removeAppPassword}
				onClose={() => setShowRemovePasswordDialog(false)}
			/>
		</Fragment>
	);
}

const DESC =
	"Removing your app password will make all your data accessible to anyone who has access to your device.";
