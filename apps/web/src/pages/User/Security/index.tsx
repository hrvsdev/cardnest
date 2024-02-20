import { Fragment, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { IconLockOpenOff, IconPasswordMobilePhone } from "@tabler/icons-react";
import { SettingsGroup } from "components/Settings";

import { CreatePin } from "@pages/CreatePin";
import { VerifyPinBeforeAction } from "@pages/Pin/VerifyPinBeforeAction";
import { RemovePinDialog } from "@pages/User/components/RemovePinDialog";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { SettingsButton } from "@components/Settings/Button.tsx";
import { Show } from "@components/Show";

import { useSetAfterPinVerified } from "@libs/hooks/src/actions";
import { useHasCreatedPin, useRemovePin } from "@libs/hooks/src/auth";
import { useRemoveCardsPin } from "@libs/hooks/src/card/data.ts";

export function Security() {
	return (
		<Routes>
			<Route index element={<SecurityPage />} />
			<Route path="pin/verify" element={<VerifyPinBeforeAction />} />
			<Route path="pin/create/*" element={<CreatePin />} />
		</Routes>
	);
}

function SecurityPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const hasCreatedPin = useHasCreatedPin();
	const removeCardsPin = useRemoveCardsPin();
	const removePin = useRemovePin();
	const setAfterPinVerified = useSetAfterPinVerified();

	const [showRemovePasswordDialog, setShowRemovePasswordDialog] = useState(false);

	const navigateToCreatePin = () => {
		navigate(location.pathname + "/pin/create");
	};

	const removeAppPassword = async () => {
		await removeCardsPin();
		await removePin();

		navigate(location.pathname);
	};

	const onCreatePinClick = () => {
		if (hasCreatedPin) {
			setAfterPinVerified(() => navigateToCreatePin);
			navigate("pin/verify");
		} else {
			navigateToCreatePin();
		}
	};

	const onRemovePasswordConfirmClick = () => {
		setAfterPinVerified(() => removeAppPassword);
		navigate("pin/verify");
	};

	return (
		<Fragment>
			<SubPageHeader title="Security" leftIconLabel="Settings" />
			<PageContainer className="space-y-6">
				<SettingsGroup title="Password" description={hasCreatedPin ? "" : CREATE_PASSWORD_DESC}>
					<SettingsButton
						title={hasCreatedPin ? "Change password" : "Create password"}
						onClick={onCreatePinClick}
						Icon={IconPasswordMobilePhone}
					/>
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
				onConfirm={onRemovePasswordConfirmClick}
				onClose={() => setShowRemovePasswordDialog(false)}
			/>
		</Fragment>
	);
}

const CREATE_PASSWORD_DESC =
	"Creating a password will make your data private and secure. You will need to enter the password every time you open the app.";

const REMOVE_PASSWORD_DESC =
	"Removing your app password will make all your data accessible to anyone who has access to your device.";
